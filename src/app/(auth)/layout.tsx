import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

import { getSession } from "~/server/better-auth/server";

const AuthLayout = async ({ children }: PropsWithChildren) => {
  const session = await getSession();

  if (session) {
    redirect("/app");
  }

  return (
    <div className="container">
      <main className="flex min-h-dvh items-center justify-center">{children}</main>
    </div>
  );
};

export default AuthLayout;
