import { supabase } from '../supabase.js';

export const ProfileModel = {
  findAll: async () => {
    const { data, error } = await supabase.from('profiles').select('*');
    if (error) {
      console.error('Error fetching profiles from Supabase:', error);
      return [];
    }
    return data;
  },

  findById: async (id) => {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', id).maybeSingle();
    if (error) {
      console.error('Error fetching profile by ID from Supabase:', error);
      return null;
    }
    return data;
  },

  findByUserId: async (userId) => {
    const { data, error } = await supabase.from('profiles').select('*').eq('user_id', userId).maybeSingle();
    if (error) {
      console.error('Error fetching profile by user ID from Supabase:', error);
      return null;
    }
    return data;
  },

  create: async (data) => {
    const newProfile = {
      id: data.id || `profile-${Date.now()}`,
      user_id: data.user_id || 'user-123',
      age: data.age || 0,
      sex: data.sex || 'unknown',
      weight_kg: data.weight_kg || 0,
      height_cm: data.height_cm || 0,
      activity_level: data.activity_level || 'low',
    };

    const { data: inserted, error } = await supabase
      .from('profiles')
      .insert([newProfile])
      .select()
      .single();

    if (error) {
      console.error('Error creating profile in Supabase:', error);
      throw error;
    }
    return inserted;
  },

  update: async (id, data) => {
    const updates = {};
    if (data.age !== undefined) updates.age = data.age;
    if (data.sex !== undefined) updates.sex = data.sex;
    if (data.weight_kg !== undefined) updates.weight_kg = data.weight_kg;
    if (data.height_cm !== undefined) updates.height_cm = data.height_cm;
    if (data.activity_level !== undefined) updates.activity_level = data.activity_level;

    const { data: updated, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error updating profile in Supabase:', error);
      throw error;
    }
    return updated;
  },

  remove: async (id) => {
    const { error } = await supabase.from('profiles').delete().eq('id', id);
    if (error) {
      console.error('Error removing profile from Supabase:', error);
      return false;
    }
    return true;
  },
};
