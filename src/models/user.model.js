const USER_ID = 'user-123';

const users = [
  {
    id: USER_ID,
    email: 'maria@example.com',
    password_hash: '$2b$10$abc123mockhash',
    created_at: '2026-06-01T09:15:00.000Z',
    is_anonymous: false,
  },
  {
    id: 'user-456',
    email: 'carlos@example.com',
    password_hash: '$2b$10$def456mockhash',
    created_at: '2026-06-02T12:20:00.000Z',
    is_anonymous: false,
  },
  {
    id: 'user-789',
    email: 'anon@example.com',
    password_hash: '$2b$10$ghi789mockhash',
    created_at: '2026-06-03T14:30:00.000Z',
    is_anonymous: true,
  },
];

const generateId = () => `user-${Date.now()}`;

export const UserModel = {
  findAll: async () => {
    return [...users];
  },

  findById: async (id) => {
    return users.find((user) => user.id === id) || null;
  },

  create: async (data) => {
    const newUser = {
      id: generateId(),
      email: data.email || '',
      password_hash: data.password_hash || '',
      created_at: new Date().toISOString(),
      is_anonymous: data.is_anonymous === true,
    };

    users.push(newUser);
    return newUser;
  },

  update: async (id, data) => {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return null;

    const existing = users[index];
    const updatedUser = {
      ...existing,
      email: data.email ?? existing.email,
      password_hash: data.password_hash ?? existing.password_hash,
      is_anonymous: data.is_anonymous ?? existing.is_anonymous,
    };

    users[index] = updatedUser;
    return updatedUser;
  },

  remove: async (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return false;

    users.splice(index, 1);
    return true;
  },
};
