"use client";

import Loader from "@/components/Loader";
import UsersProfilePublic, {
  UserPublicProfile,
} from "@/components/profile/UserProfile";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getUserPublicProfile } from "@/supabase/rpc/content";

function Page() {
  const params = useParams<{ username?: string }>();
  const username = (params?.username as string | undefined) || undefined;

  const [profile, setProfile] = useState<UserPublicProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    if (!username) {
      setLoading(false);
      setError("No user name provided");
      return;
    }
    const fetchProfile = async () => {
      const res = await getUserPublicProfile(username);
      console.log("Fetched profile:", res);
      if (!res.success) {
        setError(res.error || "Profile not found");
        setProfile(null);
      } else if (res.data) {
        // Transform the data to match UserPublicProfile interface
        const transformedProfile: UserPublicProfile = {
          user: {
            id: res.data.user.id,
            username: res.data.user.username,
            displayName: res.data.user.displayName || null,
            bio: res.data.user.bio || null,
            avatar: res.data.user.avatar || null,
            role: res.data.user.role,
            skills: res.data.user.skills || [],
            createdAt: res.data.user.createdAt,
          },
          blogs: res.data.blogs || [],
          projects: res.data.projects || [],
          resources: res.data.resources || [],
          events: res.data.events || [],
          badges: res.data.badges || [],
        };
        setProfile(transformedProfile);
        setError(null);
      }
      setLoading(false);
    };
    fetchProfile();
  }, [username]);

  if (loading) {
    return <Loader className="bg-white dark:bg-black" />;
  }

  if (error) {
    return (
      <div className="h-[80vh] w-full py-20 mx-auto text-center flex flex-col justify-center items-center max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Error Finding User with the username{" "}
          <span className="text-skin-base-600 dark:text-skin-base-500">
            {username}
          </span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">{error}</p>
      </div>
    );
  }

  return <>{profile && <UsersProfilePublic profile={profile} />}</>;
}

export default Page;
