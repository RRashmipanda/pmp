import { Router } from 'express';
import healthCheckRoutes from "../src/modules/health-check/healthcheck.routes"

const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({ success: true });
});

router.use('/healthcheck',healthCheckRoutes);
//router.use('/cla', Routes); 
export default router;