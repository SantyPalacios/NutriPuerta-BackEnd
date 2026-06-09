import { Router } from 'express';
import * as foodController from '../controllers/food.controller.js';

const router = Router();

router.get('/foods', foodController.getAll);
router.get('/foods/:id', foodController.getById);
router.post('/foods', foodController.create);
router.put('/foods/:id', foodController.update);
router.delete('/foods/:id', foodController.remove);

export default router;