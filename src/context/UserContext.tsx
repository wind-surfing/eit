"use client";
import React, { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { SessionUser } from "@/types/User";
import { UserContextType, UserProviderProps } from "@/types/UserContext";
import { getUserByUsername } from "@/supabase/rpc/auth";

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && !user) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (error) {

    }
  }, [user]);

  const fetchUserData = async (username: string) => {
    if (!username) return;
    setLoading(true);
    try {
      const userData = await getUserByUsername(username);
      if (userData) {
        setUser(userData);
        try {
          localStorage.setItem("user", JSON.stringify(userData));
        } catch (error) {

        }
      }
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    try {
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleAuthState = async () => {
      setLoading(true);

      if (status === "authenticated" && session?.user) {
        const sUser = session.user;
        const mapped: SessionUser = {
          id: sUser.id ?? "",
          email: sUser.email ?? "",
          username: sUser.username || "",
          displayName: sUser.displayName ?? "",
          role: sUser.role || "guest",
          avatar: sUser.avatar ?? null,
          emailVerified: sUser.emailVerified ?? false,
          lastActiveAt: sUser.lastActiveAt ?? new Date(),
          bio: sUser.bio ?? null,
          skills: sUser.skills ?? [],
          badges: sUser.badges ?? [],
        };

        setUser(mapped);
        try {
          localStorage.setItem("user", JSON.stringify(mapped));

        } catch (error) {

        }

        if (mapped.username) {
          try {
            const userData = await getUserByUsername(mapped.username);
            if (userData) {
              setUser(userData);
              localStorage.setItem("user", JSON.stringify(userData));

            }
          } catch (error) {

          }
        }
      } else if (status === "unauthenticated") {
        setUser(null);
        try {
          localStorage.removeItem("user");
        } catch (error) {

        }
      }

      setLoading(false);
    };

    handleAuthState();
  }, [session, status]);

  return (
    <UserContext.Provider
      value={{ user, setUser, fetchUserData, logoutUser, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
