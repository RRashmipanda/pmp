import { Router } from "express";
import { healthCheck } from "./healthcheck.controllers";

const router = Router();

router.get('/',healthCheck)

export default router;
