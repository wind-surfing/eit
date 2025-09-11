"use client";

import "@/styles/social-auth-styles.css";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa6";

interface SocialAuthProps {
  className?: string;
}

export default function SocialAuth({ className = "" }: SocialAuthProps) {
  const handleSocialSignIn = async (provider: string) => {
    try {
      await signIn(provider, {
        callbackUrl: "/home",
      });
    } catch (error) {

    }
  };

  return (
    <div className={`extra-sign-in-container ${className}`}>
      <p className="social-text text-[#444444] dark:text-[#bbbbbb]">
        Or Continue with social platforms
      </p>
      <div className="social-media">
        <Button
          type="button"
          variant="outline"
          className="social-icon px-0 py-0 text-[#333] dark:text-[#ccc]"
          onClick={() => handleSocialSignIn("google")}
          aria-label="Sign in with Google"
        >
          <FaGoogle className="social-icon-svg svg" />
        </Button>
        <Button
          type="button"
          variant="outline"
          className="social-icon px-0 py-0 text-[#333] dark:text-[#ccc]"
          onClick={() => handleSocialSignIn("github")}
          aria-label="Sign in with GitHub"
        >
          <FaGithub className="social-icon-svg svg" />
        </Button>
      </div>
    </div>
  );
}
