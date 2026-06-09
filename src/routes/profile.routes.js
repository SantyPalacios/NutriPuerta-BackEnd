import { Router } from 'express';
import * as profileController from '../controllers/profile.controller.js';

const router = Router();

router.get('/profiles', profileController.getAll);
router.get('/profiles/:id', profileController.getById);
router.post('/profiles', profileController.create);
router.put('/profiles/:id', profileController.update);
router.delete('/profiles/:id', profileController.remove);

export default router;