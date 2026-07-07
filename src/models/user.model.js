import { supabase } from '../supabase.js';

export const UserModel = {
  findAll: async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
      console.error('Error fetching users from Supabase:', error);
      return [];
    }
    return data;
  },

  findById: async (id) => {
    const { data, error } = await supabase.from('users').select('*').eq('id', id).maybeSingle();
    if (error) {
      console.error('Error fetching user by ID from Supabase:', error);
      return null;
    }
    return data;
  },

  create: async (data) => {
    const newUser = {
      id: data.id || `user-${Date.now()}`,
      email: data.email || '',
      password_hash: data.password_hash || '',
      created_at: new Date().toISOString(),
      is_anonymous: data.is_anonymous === true,
    };

    const { data: inserted, error } = await supabase
      .from('users')
      .insert([newUser])
      .select()
      .single();

    if (error) {
      console.error('Error creating user in Supabase:', error);
      throw error;
    }
    return inserted;
  },

  update: async (id, data) => {
    const updates = {};
    if (data.email !== undefined) updates.email = data.email;
    if (data.password_hash !== undefined) updates.password_hash = data.password_hash;
    if (data.is_anonymous !== undefined) updates.is_anonymous = data.is_anonymous;

    const { data: updated, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error updating user in Supabase:', error);
      throw error;
    }
    return updated;
  },

  remove: async (id) => {
    const { error } = await supabase.from('users').delete().eq('id', id);
    if (error) {
      console.error('Error removing user from Supabase:', error);
      return false;
    }
    return true;
  },
};
