"use client";

import { authClient } from "~/server/better-auth/client";

const SignIn = () => {
  const handleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default SignIn;
