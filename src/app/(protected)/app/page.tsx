"use client";

import { authClient } from "~/server/better-auth/client";

const Protected = () => {
  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
};

export default Protected;
