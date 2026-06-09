import { LeadModel } from '../models/lead.model.js';

const DEFAULT_USER_ID = 'user-123';

export const getAll = async (_req, res) => {
  const leads = await LeadModel.findAll();
  res.json({ data: leads });
};

export const getById = async (req, res) => {
  const { id } = req.params;
  const lead = await LeadModel.findById(id);

  if (!lead) {
    return res.status(404).json({ error: 'Lead no encontrado' });
  }

  res.json({ data: lead });
};

export const create = async (req, res) => {
  const { user_id, assessment_id, source } = req.body;

  if (!user_id || !assessment_id || !source) {
    return res.status(400).json({
      error: 'user_id, assessment_id y source son obligatorios',
    });
  }

  const newLead = await LeadModel.create({
    user_id,
    assessment_id,
    source,
  });

  res.status(201).json({ data: newLead });
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { assessment_id, source } = req.body;
  const updatedLead = await LeadModel.update(id, {
    assessment_id,
    source,
  });

  res.json({ data: updatedLead });
};

export const remove = async (req, res) => {
  const { id } = req.params;
  const deleted = await LeadModel.remove(id);
  if (!deleted) {
    return res.status(404).json({ error: 'Lead no encontrado' });
  }

  res.status(204).send();
};
