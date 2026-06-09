import { Router } from 'express';
import * as assessmentController from '../controllers/assessment.controller.js';

const router = Router();

router.get('/assessments', assessmentController.getAll);
router.get('/assessments/:id', assessmentController.getById);
router.post('/assessments', assessmentController.create);
router.put('/assessments/:id', assessmentController.update);
router.delete('/assessments/:id', assessmentController.remove);

export default router;