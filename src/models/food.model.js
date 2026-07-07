import { supabase } from '../supabase.js';

export const FoodModel = {
  findAll: async () => {
    const { data, error } = await supabase.from('foods').select('*');
    if (error) {
      console.error('Error fetching foods from Supabase:', error);
      return [];
    }
    return data;
  },

  findById: async (id) => {
    const { data, error } = await supabase.from('foods').select('*').eq('id', id).maybeSingle();
    if (error) {
      console.error('Error fetching food by ID from Supabase:', error);
      return null;
    }
    return data;
  },

  create: async (data) => {
    const newFood = {
      id: data.id || `food-${Date.now()}`,
      name: data.name || '',
      category: data.category || '',
      serving_size_g: data.serving_size_g || 0,
      calories: data.calories || 0,
      protein_g: data.protein_g || 0,
      carbs_g: data.carbs_g || 0,
      fat_g: data.fat_g || 0,
      fiber_g: data.fiber_g || 0,
      description_myth: data.description_myth || '',
    };

    const { data: inserted, error } = await supabase
      .from('foods')
      .insert([newFood])
      .select()
      .single();

    if (error) {
      console.error('Error creating food in Supabase:', error);
      throw error;
    }
    return inserted;
  },

  update: async (id, data) => {
    const updates = {};
    if (data.name !== undefined) updates.name = data.name;
    if (data.category !== undefined) updates.category = data.category;
    if (data.serving_size_g !== undefined) updates.serving_size_g = data.serving_size_g;
    if (data.calories !== undefined) updates.calories = data.calories;
    if (data.protein_g !== undefined) updates.protein_g = data.protein_g;
    if (data.carbs_g !== undefined) updates.carbs_g = data.carbs_g;
    if (data.fat_g !== undefined) updates.fat_g = data.fat_g;
    if (data.fiber_g !== undefined) updates.fiber_g = data.fiber_g;
    if (data.description_myth !== undefined) updates.description_myth = data.description_myth;

    const { data: updated, error } = await supabase
      .from('foods')
      .update(updates)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error updating food in Supabase:', error);
      throw error;
    }
    return updated;
  },

  remove: async (id) => {
    const { error } = await supabase.from('foods').delete().eq('id', id);
    if (error) {
      console.error('Error removing food from Supabase:', error);
      return false;
    }
    return true;
  },
};
