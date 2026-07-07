import { supabase } from '../supabase.js';

export const AssessmentModel = {
  findAll: async () => {
    const { data, error } = await supabase.from('assessments').select('*');
    if (error) {
      console.error('Error fetching assessments from Supabase:', error);
      return [];
    }
    return data;
  },

  findById: async (id) => {
    const { data, error } = await supabase.from('assessments').select('*').eq('id', id).maybeSingle();
    if (error) {
      console.error('Error fetching assessment by ID from Supabase:', error);
      return null;
    }
    return data;
  },

  findByUserId: async (userId) => {
    const { data, error } = await supabase.from('assessments').select('*').eq('user_id', userId).maybeSingle();
    if (error) {
      console.error('Error fetching assessment by user ID from Supabase:', error);
      return null;
    }
    return data;
  },

  create: async (data) => {
    const newAssessment = {
      id: data.id || `assessment-${Date.now()}`,
      user_id: data.user_id || 'user-123',
      profile_snapshot: data.profile_snapshot || {},
      imc: data.imc || 0,
      imc_category: data.imc_category || 'Unknown',
      red_kcal: data.red_kcal || 0,
      protein_g: data.protein_g || 0,
      carbs_g: data.carbs_g || 0,
      fat_g: data.fat_g || 0,
      created_at: new Date().toISOString(),
    };

    const { data: inserted, error } = await supabase
      .from('assessments')
      .insert([newAssessment])
      .select()
      .single();

    if (error) {
      console.error('Error creating assessment in Supabase:', error);
      throw error;
    }
    return inserted;
  },

  update: async (id, data) => {
    const updates = {};
    if (data.profile_snapshot !== undefined) updates.profile_snapshot = data.profile_snapshot;
    if (data.imc !== undefined) updates.imc = data.imc;
    if (data.imc_category !== undefined) updates.imc_category = data.imc_category;
    if (data.red_kcal !== undefined) updates.red_kcal = data.red_kcal;
    if (data.protein_g !== undefined) updates.protein_g = data.protein_g;
    if (data.carbs_g !== undefined) updates.carbs_g = data.carbs_g;
    if (data.fat_g !== undefined) updates.fat_g = data.fat_g;

    const { data: updated, error } = await supabase
      .from('assessments')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error updating assessment in Supabase:', error);
      throw error;
    }
    return updated;
  },

  remove: async (id) => {
    const { error } = await supabase.from('assessments').delete().eq('id', id);
    if (error) {
      console.error('Error removing assessment from Supabase:', error);
      return false;
    }
    return true;
  },
};
