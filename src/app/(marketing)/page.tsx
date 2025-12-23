import Link from "next/link";

import { api } from "~/trpc/server";

const Marketing = async () => {
  const hello = await api.welcome.hello({ text: "from tRPC" });

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <p>{hello ? hello.greeting : "Loading tRPC query..."}</p>
      <Link href="/sign-in" role="button" className="btn btn-primary">
        Sign in
      </Link>
    </div>
  );
};

export default Marketing;
