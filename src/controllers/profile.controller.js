import { ProfileModel } from '../models/profile.model.js';

const DEFAULT_USER_ID = 'user-123';
const DEFAULT_PROFILE_ID = 'profile-123';

export const getAll = async (_req, res) => {
  const profiles = await ProfileModel.findAll();
  res.json({ data: profiles });
};

export const getById = async (req, res) => {
  const { id } = req.params;
  const profile = await ProfileModel.findById(id);

  if (!profile) {
    return res.status(404).json({ error: 'Perfil no encontrado' });
  }

  res.json({ data: profile });
};

export const create = async (req, res) => {
  const { user_id, age, sex, weight_kg, height_cm, activity_level } = req.body;

  if (!user_id || !age || !sex || !weight_kg || !height_cm) {
    return res.status(400).json({ error: 'user_id, age, sex, weight_kg y height_cm son obligatorios' });
  }

  const newProfile = await ProfileModel.create({
    user_id,
    age,
    sex,
    weight_kg,
    height_cm,
    activity_level,
  });

  res.status(201).json({ data: newProfile });
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { age, sex, weight_kg, height_cm, activity_level } = req.body;
  const updatedProfile = await ProfileModel.update(id, {
    age,
    sex,
    weight_kg,
    height_cm,
    activity_level,
  });

  res.json({ data: updatedProfile });
};

export const remove = async (req, res) => {
  const { id } = req.params;
  const deleted = await ProfileModel.remove(id);
  if (!deleted) {
    return res.status(404).json({ error: 'Perfil no encontrado' });
  }

  res.status(204).send();
};
