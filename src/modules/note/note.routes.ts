import { Router } from "express";
import {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
} from "./note.controllers";
import {
  verifyJWT,
  validateProjectPermission,
} from "../../middlewares/auth-middleware";
import { AvailableUserRole, UserRolesEnum } from "../../utils/constants";
const router = Router();


// GET /:projectId → List project notes (secured, role-based)
router.get(
  "/:projectId",
  verifyJWT,
  validateProjectPermission(AvailableUserRole), // all project members
  getNotes
);

// POST /:projectId → Create note (secured, Admin only)
router.post(
  "/:projectId",
  verifyJWT,
  validateProjectPermission([UserRolesEnum.ADMIN]),
  createNote
);

// GET /:projectId/n/:noteId → Get note details (secured, role-based)
router.get(
  "/:projectId/n/:noteId",
  verifyJWT,
  validateProjectPermission(AvailableUserRole),
  getNoteById
);

// PUT /:projectId/n/:noteId → Update note (secured, Admin only)
router.put(
  "/:projectId/n/:noteId",
  verifyJWT,
  validateProjectPermission([UserRolesEnum.ADMIN]),
  updateNote
);

// DELETE /:projectId/n/:noteId → Delete note (secured, Admin only)
router.delete(
  "/:projectId/n/:noteId",
  verifyJWT,
  validateProjectPermission([UserRolesEnum.ADMIN]),
  deleteNote
);

export default router;
