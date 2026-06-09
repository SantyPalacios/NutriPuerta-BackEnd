import { AssessmentModel } from '../models/assessment.model.js';

const DEFAULT_USER_ID = 'user-123';

export const getAll = async (_req, res) => {
  const assessments = await AssessmentModel.findAll();
  res.json({ data: assessments });
};

export const getById = async (req, res) => {
  const { id } = req.params;
  const assessment = await AssessmentModel.findById(id);

  if (!assessment) {
    return res.status(404).json({ error: 'Assessment no encontrado' });
  }

  res.json({ data: assessment });
};

export const create = async (req, res) => {
  const {
    user_id,
    profile_snapshot,
    imc,
    imc_category,
    red_kcal,
    protein_g,
    carbs_g,
    fat_g,
  } = req.body;

  if (!user_id || !profile_snapshot) {
    return res.status(400).json({
      error: 'user_id y profile_snapshot son obligatorios',
    });
  }

  const newAssessment = await AssessmentModel.create({
    user_id,
    profile_snapshot,
    imc,
    imc_category,
    red_kcal,
    protein_g,
    carbs_g,
    fat_g,
  });

  res.status(201).json({ data: newAssessment });
};

export const update = async (req, res) => {
  const { id } = req.params;
  const {
    profile_snapshot,
    imc,
    imc_category,
    red_kcal,
    protein_g,
    carbs_g,
    fat_g,
  } = req.body;

  const updatedAssessment = await AssessmentModel.update(id, {
    profile_snapshot,
    imc,
    imc_category,
    red_kcal,
    protein_g,
    carbs_g,
    fat_g,
  });

  res.json({ data: updatedAssessment });
};

export const remove = async (req, res) => {
  const { id } = req.params;
  const deleted = await AssessmentModel.remove(id);
  if (!deleted) {
    return res.status(404).json({ error: 'Assessment no encontrado' });
  }

  res.status(204).send();
};
