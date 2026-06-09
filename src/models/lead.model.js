const leads = [
  {
    id: 'lead-123',
    user_id: 'user-123',
    assessment_id: 'assessment-123',
    source: 'instagram',
    created_at: '2026-06-05T09:00:00.000Z',
  },
  {
    id: 'lead-456',
    user_id: 'user-456',
    assessment_id: 'assessment-456',
    source: 'referido',
    created_at: '2026-06-05T10:00:00.000Z',
  },
  {
    id: 'lead-789',
    user_id: 'user-789',
    assessment_id: 'assessment-789',
    source: 'web',
    created_at: '2026-06-05T11:00:00.000Z',
  },
];

const generateLeadId = () => `lead-${Date.now()}`;

export const LeadModel = {
  findAll: async () => {
    return [...leads];
  },

  findById: async (id) => {
    return leads.find((lead) => lead.id === id) || null;
  },

  findByUserId: async (userId) => {
    return leads.find((lead) => lead.user_id === userId) || null;
  },

  create: async (data) => {
    const newLead = {
      id: generateLeadId(),
      user_id: data.user_id || 'user-123',
      assessment_id: data.assessment_id || '',
      source: data.source || 'unknown',
      created_at: new Date().toISOString(),
    };

    leads.push(newLead);
    return newLead;
  },

  update: async (id, data) => {
    const index = leads.findIndex((lead) => lead.id === id);
    if (index === -1) return null;

    const existing = leads[index];
    const updatedLead = {
      ...existing,
      assessment_id: data.assessment_id ?? existing.assessment_id,
      source: data.source ?? existing.source,
    };

    leads[index] = updatedLead;
    return updatedLead;
  },

  remove: async (id) => {
    const index = leads.findIndex((lead) => lead.id === id);
    if (index === -1) return false;

    leads.splice(index, 1);
    return true;
  },
};
