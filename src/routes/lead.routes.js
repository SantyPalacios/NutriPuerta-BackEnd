import { Router } from 'express';
import * as leadController from '../controllers/lead.controller.js';

const router = Router();

router.get('/leads', leadController.getAll);
router.get('/leads/:id', leadController.getById);
router.post('/leads', leadController.create);
router.put('/leads/:id', leadController.update);
router.delete('/leads/:id', leadController.remove);

export default router;