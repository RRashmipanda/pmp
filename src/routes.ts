import { Router } from 'express';
import healthCheckRoutes from "../src/modules/health-check/healthcheck.routes";
import authuserRoutes from "../src/modules/auth-user/auth-user.routes";


const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({ success: true });
});

router.use('/healthcheck',healthCheckRoutes);
router.use('/auth', authuserRoutes); 

export default router;