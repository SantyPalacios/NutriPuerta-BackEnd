import { Router } from 'express';
import userRoutes from './user.routes.js';
import profileRoutes from './profile.routes.js';
import assessmentRoutes from './assessment.routes.js';
import foodRoutes from './food.routes.js';
import leadRoutes from './lead.routes.js';
import contactRoutes from './contact.routes.js';

const router = Router();

// GET /api/health — verifica que el servidor esté activo
router.get('/health', async (_req, res) => {
  res.json({ status: 'ok' });
});

router.use(userRoutes);
router.use(profileRoutes);
router.use(assessmentRoutes);
router.use(foodRoutes);
router.use(leadRoutes);
router.use(contactRoutes);

export default router;
