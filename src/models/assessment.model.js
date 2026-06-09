const assessments = [
  {
    id: 'assessment-123',
    user_id: 'user-123',
    profile_snapshot: {
      age: 28,
      sex: 'female',
      weight_kg: 65,
      height_cm: 170,
      activity_level: 'moderate',
    },
    imc: 22.5,
    imc_category: 'Normal',
    red_kcal: 2100,
    protein_g: 100,
    carbs_g: 250,
    fat_g: 70,
    created_at: '2026-06-04T10:00:00.000Z',
  },
  {
    id: 'assessment-456',
    user_id: 'user-456',
    profile_snapshot: {
      age: 34,
      sex: 'male',
      weight_kg: 78,
      height_cm: 180,
      activity_level: 'high',
    },
    imc: 24.1,
    imc_category: 'Normal',
    red_kcal: 2600,
    protein_g: 140,
    carbs_g: 280,
    fat_g: 90,
    created_at: '2026-06-04T11:00:00.000Z',
  },
  {
    id: 'assessment-789',
    user_id: 'user-789',
    profile_snapshot: {
      age: 22,
      sex: 'female',
      weight_kg: 55,
      height_cm: 160,
      activity_level: 'low',
    },
    imc: 21.5,
    imc_category: 'Normal',
    red_kcal: 1800,
    protein_g: 70,
    carbs_g: 210,
    fat_g: 60,
    created_at: '2026-06-04T12:00:00.000Z',
  },
];

const generateAssessmentId = () => `assessment-${Date.now()}`;

export const AssessmentModel = {
  findAll: async () => {
    return [...assessments];
  },

  findById: async (id) => {
    return assessments.find((assessment) => assessment.id === id) || null;
  },

  findByUserId: async (userId) => {
    return assessments.find((assessment) => assessment.user_id === userId) || null;
  },

  create: async (data) => {
    const newAssessment = {
      id: generateAssessmentId(),
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

    assessments.push(newAssessment);
    return newAssessment;
  },

  update: async (id, data) => {
    const index = assessments.findIndex((assessment) => assessment.id === id);
    if (index === -1) return null;

    const existing = assessments[index];
    const updatedAssessment = {
      ...existing,
      profile_snapshot: data.profile_snapshot ?? existing.profile_snapshot,
      imc: data.imc ?? existing.imc,
      imc_category: data.imc_category ?? existing.imc_category,
      red_kcal: data.red_kcal ?? existing.red_kcal,
      protein_g: data.protein_g ?? existing.protein_g,
      carbs_g: data.carbs_g ?? existing.carbs_g,
      fat_g: data.fat_g ?? existing.fat_g,
    };

    assessments[index] = updatedAssessment;
    return updatedAssessment;
  },

  remove: async (id) => {
    const index = assessments.findIndex((assessment) => assessment.id === id);
    if (index === -1) return false;

    assessments.splice(index, 1);
    return true;
  },
};
