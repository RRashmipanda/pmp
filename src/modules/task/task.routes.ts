import { Router } from "express";
import {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  createSubTask,
  updateSubTask,
  deleteSubTask,
} from "./task.controllers ";
import {
  verifyJWT,
  validateProjectPermission,
} from "../../middlewares/auth-middleware";
import { AvailableUserRole, UserRolesEnum } from "../../utils/constants";

const router = Router();



/**
 * Task Routes
 * Base path: /api/tasks
 */

// -------------------- Project Tasks --------------------
// GET /:projectId → List project tasks (secured, role-based)
router.get(
  "/:projectId",
  verifyJWT,
  validateProjectPermission(AvailableUserRole), // any valid member can view
  getTasks
);

// POST /:projectId → Create task (secured, Admin/Project Admin)
router.post(
  "/:projectId",
  verifyJWT,
  validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]),
  createTask
);

// -------------------- Single Task --------------------
// GET /:projectId/t/:taskId → Get task details
router.get(
  "/:projectId/t/:taskId",
  verifyJWT,
  validateProjectPermission(AvailableUserRole), // all members can view
  getTaskById
);

// PUT /:projectId/t/:taskId → Update task
router.put(
  "/:projectId/t/:taskId",
  verifyJWT,
  validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]),
  updateTask
);

// DELETE /:projectId/t/:taskId → Delete task
router.delete(
  "/:projectId/t/:taskId",
  verifyJWT,
  validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]),
  deleteTask
);

// -------------------- Subtasks --------------------
// POST /:projectId/t/:taskId/subtasks → Create subtask
router.post(
  "/:projectId/t/:taskId/subtasks",
  verifyJWT,
  validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]),
  createSubTask
);

// PUT /:projectId/st/:subtaskId → Update subtask
router.put(
  "/:projectId/st/:subtaskId",
  verifyJWT,
  validateProjectPermission(AvailableUserRole), // any member can mark/update
  updateSubTask
);

// DELETE /:projectId/st/:subtaskId → Delete subtask
router.delete(
  "/:projectId/st/:subtaskId",
  verifyJWT,
  validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]),
  deleteSubTask
);

export default router;
