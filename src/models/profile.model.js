const profiles = [
  {
    id: 'profile-123',
    user_id: 'user-123',
    age: 28,
    sex: 'female',
    weight_kg: 65,
    height_cm: 170,
    activity_level: 'moderate',
  },
  {
    id: 'profile-456',
    user_id: 'user-456',
    age: 34,
    sex: 'male',
    weight_kg: 78,
    height_cm: 180,
    activity_level: 'high',
  },
  {
    id: 'profile-789',
    user_id: 'user-789',
    age: 22,
    sex: 'female',
    weight_kg: 55,
    height_cm: 160,
    activity_level: 'low',
  },
];

const generateProfileId = () => `profile-${Date.now()}`;

export const ProfileModel = {
  findAll: async () => {
    return [...profiles];
  },

  findById: async (id) => {
    return profiles.find((profile) => profile.id === id) || null;
  },

  findByUserId: async (userId) => {
    return profiles.find((profile) => profile.user_id === userId) || null;
  },

  create: async (data) => {
    const newProfile = {
      id: generateProfileId(),
      user_id: data.user_id || 'user-123',
      age: data.age || 0,
      sex: data.sex || 'unknown',
      weight_kg: data.weight_kg || 0,
      height_cm: data.height_cm || 0,
      activity_level: data.activity_level || 'low',
    };

    profiles.push(newProfile);
    return newProfile;
  },

  update: async (id, data) => {
    const index = profiles.findIndex((profile) => profile.id === id);
    if (index === -1) return null;

    const existing = profiles[index];
    const updatedProfile = {
      ...existing,
      age: data.age ?? existing.age,
      sex: data.sex ?? existing.sex,
      weight_kg: data.weight_kg ?? existing.weight_kg,
      height_cm: data.height_cm ?? existing.height_cm,
      activity_level: data.activity_level ?? existing.activity_level,
    };

    profiles[index] = updatedProfile;
    return updatedProfile;
  },

  remove: async (id) => {
    const index = profiles.findIndex((profile) => profile.id === id);
    if (index === -1) return false;

    profiles.splice(index, 1);
    return true;
  },
};
