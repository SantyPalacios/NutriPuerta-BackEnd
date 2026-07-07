import { supabase } from '../supabase.js';

export const LeadModel = {
  findAll: async () => {
    const { data, error } = await supabase.from('leads').select('*');
    if (error) {
      console.error('Error fetching leads from Supabase:', error);
      return [];
    }
    return data;
  },

  findById: async (id) => {
    const { data, error } = await supabase.from('leads').select('*').eq('id', id).maybeSingle();
    if (error) {
      console.error('Error fetching lead by ID from Supabase:', error);
      return null;
    }
    return data;
  },

  findByUserId: async (userId) => {
    const { data, error } = await supabase.from('leads').select('*').eq('user_id', userId).maybeSingle();
    if (error) {
      console.error('Error fetching lead by user ID from Supabase:', error);
      return null;
    }
    return data;
  },

  create: async (data) => {
    const newLead = {
      id: data.id || `lead-${Date.now()}`,
      user_id: data.user_id || 'user-123',
      assessment_id: data.assessment_id || '',
      source: data.source || 'unknown',
      created_at: new Date().toISOString(),
    };

    const { data: inserted, error } = await supabase
      .from('leads')
      .insert([newLead])
      .select()
      .single();

    if (error) {
      console.error('Error creating lead in Supabase:', error);
      throw error;
    }
    return inserted;
  },

  update: async (id, data) => {
    const updates = {};
    if (data.assessment_id !== undefined) updates.assessment_id = data.assessment_id;
    if (data.source !== undefined) updates.source = data.source;

    const { data: updated, error } = await supabase
      .from('leads')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error updating lead in Supabase:', error);
      throw error;
    }
    return updated;
  },

  remove: async (id) => {
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) {
      console.error('Error removing lead from Supabase:', error);
      return false;
    }
    return true;
  },
};
