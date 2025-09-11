import { createBrowserClient } from "@/supabase/client";
import { SessionUser } from "@/types/User";

export async function createUser(userData: {
  email: string;
  password: string;
  username: string;
}) {
  const supabase = createBrowserClient();

  const { data, error } = await supabase.rpc("create_user_account", {
    p_email: userData.email,
    p_password: userData.password,
    p_username: userData.username,
  });

  if (error) {
    return {
      success: false,
      error: "Failed to create user account",
    };
  }

  return data;
}

export async function authenticateUser(credentials: {
  identifier: string;
  password: string;
}) {
  const supabase = createBrowserClient();

  const { data, error } = await supabase.rpc("authenticate_user", {
    p_identifier: credentials.identifier,
    p_password: credentials.password,
  });

  if (error) {
    return {
      success: false,
      error: "Authentication failed",
    };
  }

  return data;
}

export async function verifyUserEmail(email: string, verificationCode: string) {
  const supabase = createBrowserClient();

  const { data, error } = await supabase.rpc("verify_user_email", {
    p_identifier: email,
    p_verification_code: verificationCode,
  });

  if (error) {
    return {
      success: false,
      error: "Email verification failed",
    };
  }

  return data;
}

export async function resendVerificationCode(email: string) {
  const supabase = createBrowserClient();

  const { data, error } = await supabase.rpc("resend_verification_code", {
    p_identifier: email,
  });

  if (error) {
    return {
      success: false,
      error: "Failed to resend verification code",
    };
  }

  return data;
}

export async function createOrUpdateSocialUser(socialData: {
  email: string;
  name: string;
  image?: string;
}) {
  const supabase = createBrowserClient();

  const { data, error } = await supabase.rpc("create_or_update_social_user", {
    p_email: socialData.email,
    p_name: socialData.name,
    p_image: socialData.image,
  });

  if (error) {
    return {
      success: false,
      error: "Failed to create/update social user",
    };
  }

  return data;
}

export async function updateUserProfile(params: {
  userId: string;
  username?: string;
  displayName?: string;
  bio?: string | null;
  avatar?: string | null;
  skills?: string[];
}) {
  const supabase = createBrowserClient();

  const { data, error } = await supabase.rpc("update_user_profile", {
    p_user_id: params.userId,
    p_username: params.username,
    p_displayName: params.displayName,
    p_bio: params.bio,
    p_avatar: params.avatar,
    p_skills: params.skills,
  });

  if (error) {
    return { success: false, error: "Error updating profile" } as const;
  }

  return data as { success: boolean; error?: string };
}

export async function getUserPublicProfile({
  userId,
  username,
}: {
  userId?: string;
  username?: string;
}) {
  const supabase = createBrowserClient();

  const { data, error } = await supabase.rpc("get_user_public_profile", {
    p_user_id: userId ?? null,
    p_username: username ?? null,
  });

  if (error) {
    return { success: false, error: "Error fetching profile" } as const;
  }

  if (!data?.success) {
    return { success: false, error: data?.error || "Not found" } as const;
  }

  return data;
}

export async function checkUsernameUnique(username: string) {
  const supabase = createBrowserClient();

  const { data, error } = await supabase.rpc("check_username_unique", {
    p_username: username,
  });

  if (error) {
    return { success: false, error: "Error checking username" } as const;
  }

  return data as { success: boolean; message?: string };
}

export async function getUserById(userId: string): Promise<SessionUser | null> {
  const supabase = createBrowserClient();

  const { data, error } = await supabase.rpc("get_user_by_id", {
    p_user_id: userId,
  });

  if (error) {
    return null;
  }

  if (!data?.success || !data.user) {
    return null;
  }

  return data.user as SessionUser;
}

export async function getUserByUsername(
  username: string
): Promise<SessionUser | null> {
  const supabase = createBrowserClient();

  const { data, error } = await supabase.rpc("get_user_by_username", {
    p_username: username,
  });

  if (error) {
    return null;
  }

  if (!data?.success || !data.user) {
    return null;
  }

  return data.user as SessionUser;
}
