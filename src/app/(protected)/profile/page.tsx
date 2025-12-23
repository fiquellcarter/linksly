"use client";

import { useRouter } from "next/navigation";

import { authClient } from "~/server/better-auth/client";

const Profile = () => {
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
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl leading-tight font-semibold tracking-tight">Profile</h1>
          <p className="text-base-content/80 leading-relaxed">Update your basic account information and settings.</p>
        </div>
        <button type="button" className="btn btn-error" onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Profile;
