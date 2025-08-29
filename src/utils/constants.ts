

export const UserRolesEnum = {
  ADMIN: "admin",
  PROJECT_ADMIN: "project_admin",
  MEMBER: "member",
};

export const AvailableUserRole = Object.values(UserRolesEnum);

export const TaskStatusEnum = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done",
};

export const AvailableTaskStatues = Object.values(TaskStatusEnum);


if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is missing in environment variables");
}

export const MONGO_URI: string = process.env.MONGO_URI;
