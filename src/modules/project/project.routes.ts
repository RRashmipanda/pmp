import { Router } from "express";
import * as controller from './project.controller';
import { validate } from "../../middlewares/validator-middleware";
import {
  createProjectValidator,
  addMembertoProjectValidator,
} from "../../validators";
import {
  verifyJWT,
  validateProjectPermission,
} from "../../middlewares/auth-middleware";
import { AvailableUserRole, UserRolesEnum } from "../../utils/constants";

const router = Router();
router.use(verifyJWT);


router.get("/", controller.getProjects);
router.post("/", createProjectValidator(), validate, controller.createProject);
router.get("/:projectId", validateProjectPermission(AvailableUserRole), controller.getProjectById);
router.put("/:projectId", validateProjectPermission([UserRolesEnum.ADMIN]), createProjectValidator(), validate, controller.updateProject);
router.delete("/:projectId", validateProjectPermission([UserRolesEnum.ADMIN]), controller.deleteProject);


router.get("/:projectId/members", controller.getProjectMembers);
router.post(
  "/:projectId/members",
  validateProjectPermission([UserRolesEnum.ADMIN]),
  addMembertoProjectValidator(),
  validate,
  controller.addMembersToProject,
);
router.put("/:projectId/members/:userId", validateProjectPermission([UserRolesEnum.ADMIN]), controller.updateMemberRole);
router.delete("/:projectId/members/:userId", validateProjectPermission([UserRolesEnum.ADMIN]), controller.deleteMember);
 



export default router;
