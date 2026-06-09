import { UserModel } from '../models/user.model.js';

const DEFAULT_USER_ID = 'user-123';

export const getAll = async (_req, res) => {
  const users = await UserModel.findAll();
  res.json({ data: users });
};

export const getById = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);

  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  res.json({ data: user });
};

export const create = async (req, res) => {
  const { email, password_hash, is_anonymous } = req.body;

  if (!email || !password_hash) {
    return res.status(400).json({ error: 'email y password_hash son obligatorios' });
  }

  const newUser = await UserModel.create({ email, password_hash, is_anonymous });
  res.status(201).json({ data: newUser });
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { email, password_hash, is_anonymous } = req.body;
  const updatedUser = await UserModel.update(id, {
    email,
    password_hash,
    is_anonymous,
  });

  if (!updatedUser) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  res.json({ data: updatedUser });
};

export const remove = async (req, res) => {
  const { id } = req.params;
  const deleted = await UserModel.remove(id);

  if (!deleted) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  res.status(204).send();
};
