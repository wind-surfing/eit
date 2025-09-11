import { User } from "@/types/User";

export const DEFAULT_USER_DATA: User = {
  id: "",
  email: "",
  username: "Guest",
  displayName: "Guest",
  emailVerified: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  role: "guest",
  avatar: null,
  lastActiveAt: new Date(),
  bio: "",
  skills: [],
  badges: [],
};
