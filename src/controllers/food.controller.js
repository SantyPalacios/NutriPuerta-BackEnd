import { FoodModel } from '../models/food.model.js';

const DEFAULT_FOOD_ID = 'food-123';

export const getAll = async (_req, res) => {
  const foods = await FoodModel.findAll();
  res.json({ data: foods });
};

export const getById = async (req, res) => {
  const { id } = req.params;
  const food = await FoodModel.findById(id);

  if (!food) {
    return res.status(404).json({ error: 'Food no encontrado' });
  }

  res.json({ data: food });
};

export const create = async (req, res) => {
  const {
    name,
    category,
    serving_size_g,
    calories,
    protein_g,
    carbs_g,
    fat_g,
    fiber_g,
    description_myth,
  } = req.body;

  if (!name || !category) {
    return res.status(400).json({ error: 'name y category son obligatorios' });
  }

  const newFood = await FoodModel.create({
    name,
    category,
    serving_size_g,
    calories,
    protein_g,
    carbs_g,
    fat_g,
    fiber_g,
    description_myth,
  });

  res.status(201).json({ data: newFood });
};

export const update = async (req, res) => {
  const {
    name,
    category,
    serving_size_g,
    calories,
    protein_g,
    carbs_g,
    fat_g,
    fiber_g,
    description_myth,
  } = req.body;

  const { id } = req.params;
  const updatedFood = await FoodModel.update(id, {
    name,
    category,
    serving_size_g,
    calories,
    protein_g,
    carbs_g,
    fat_g,
    fiber_g,
    description_myth,
  });

  if (!updatedFood) {
    return res.status(404).json({ error: 'Food no encontrado' });
  }

  res.json({ data: updatedFood });
};

export const remove = async (req, res) => {
  const { id } = req.params;
  const deleted = await FoodModel.remove(id);

  if (!deleted) {
    return res.status(404).json({ error: 'Food no encontrado' });
  }

  res.status(204).send();
};
