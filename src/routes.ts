import { Router } from 'express';
import healthCheckRoutes from "../src/modules/health-check/healthcheck.routes";
import authuserRoutes from "../src/modules/auth-user/auth-user.routes";
import projectRoutes from "../src/modules/project/project.routes";
import taskRoutes from "../src/modules/task/task.routes";
import noteRoutes from "../src/modules/note/note.routes";

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({ success: true });
});

router.use('/healthcheck',healthCheckRoutes);
router.use('/auth', authuserRoutes); 
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);
router.use('/notes', noteRoutes);

export default router;