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

// router
//   .route("/")
//   .get(getProjects)
//   .post(createProjectValidator(), validate, createProject);

// router
//   .route("/:projectId")
//   .get(validateProjectPermission(AvailableUserRole), getProjectById)
//   .put(
//     validateProjectPermission([UserRolesEnum.ADMIN]),
//     createProjectValidator(),
//     validate,
//     updateProject,
//   )
//   .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteProject);

// router
//   .route("/:projectId/members")
//   .get(getProjectMembers)
//   .post(
//     validateProjectPermission([UserRolesEnum.ADMIN]),
//     addMembertoProjectValidator(),
//     validate,
//     addMembersToProject,
//   );

// router
//   .route("/:projectId/members/:userId")
//   .put(validateProjectPermission([UserRolesEnum.ADMIN]), updateMemberRole)
//   .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteMember);

export default router;
