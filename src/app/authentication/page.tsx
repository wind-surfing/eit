import "@/styles/authentication-page-styles.css";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ModeToggle from "@/components/auth/ModeToggle";
import AuthenticationForms from "@/components/auth/AuthenticationForms";

interface Params {
  mode?: string;
}

export default async function AuthContent({
  searchParams,
}: {
  searchParams: Promise<Params>;
}) {
  const params = await searchParams;
  const mode = params?.mode;
  const isSignUpMode = mode === "signup";

  return (
    <div className={cn("container", isSignUpMode ? "sign-up-mode" : "")}>
      <div className="forms-container">
        <AuthenticationForms />
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Are you new here ?</h3>
            <p>
              Don&apos;t worry, we got your back. Just sign up and start your
              journey
            </p>
            <ModeToggle mode="signup">Sign up</ModeToggle>
          </div>
          <Image
            priority
            src="/log.svg"
            className="image"
            alt="Logging"
            width={1140}
            height={787}
          />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Already one of us ?</h3>
            <p>Just sign in and continue your journey with us</p>
            <ModeToggle mode="signin">Sign in</ModeToggle>
          </div>
          <Image
            priority
            src="/register.svg"
            className="image"
            alt="Register"
            width={999}
            height={797}
          />
        </div>
      </div>
    </div>
  );
}
