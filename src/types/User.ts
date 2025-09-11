export type DatabaseUser = {
  id: string;
  email: string;
  username: string;
  displayName: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  avatar: string | null;
  lastActiveAt: Date;
  bio: string | null;
  skills: string[];
  badges: string[];
  password_hash: string;
  emailVerificationToken: string | null;
  passwordResetToken: string | null;
  passwordResetExpires: Date | null;
};

export type User = {
  id: string;
  email: string;
  username: string;
  displayName: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  avatar: string | null;
  lastActiveAt: Date;
  bio: string | null;
  skills: string[];
  badges: string[];
};

export type SessionUser = {
  id: string;
  email: string;
  username: string;
  displayName: string;
  role: string;
  avatar: string | null;
  emailVerified: boolean;
  lastActiveAt: Date;
  bio: string | null;
  skills: string[];
  badges: string[];
};

export const USER_FIELD_MAPPING = {
  id: "id",
  email: "email",
  username: "username",
  displayName: "displayName",
  emailVerified: "emailVerified",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  role: "role",
  avatar: "avatar",
  lastActiveAt: "lastActiveAt",
  bio: "bio",
  skills: "skills",
  badges: "badges",
} as const;

export type UserProfileUpdateFields = {
  username: string;
  displayName: string;
  bio: string | null;
  avatar: string | null;
  skills: string[];
};

export type UserProfileUpdate = {
  username: string;
  displayName: string;
  bio: string | null;
  avatar: string | null;
  skills: string[];
};

export type DefaultUserData = User;
