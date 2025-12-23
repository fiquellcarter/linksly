"use client";

import { useRouter } from "next/navigation";

import { authClient } from "~/server/better-auth/client";

const Protected = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <div>
      <button type="button" className="btn btn-error" onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  );
};

export default Protected;
