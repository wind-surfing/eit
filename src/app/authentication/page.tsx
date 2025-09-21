import AuthenticationForms from "@/components/auth/AuthenticationForms";

interface Params {
  mode?: string;
}

export default async function AuthContent({
  searchParams,
}: {
  searchParams: Promise<Params>;
}) {
  const { mode } = await searchParams;
  const isSignUpMode = mode === "signup";

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AuthenticationForms initialMode={isSignUpMode ? "signup" : "signin"} />
      </div>
    </div>
  );
}
