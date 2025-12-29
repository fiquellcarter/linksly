import { PanelLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

import SidebarContent from "~/components/sidebar-content";
import { getSession } from "~/server/better-auth/server";

const ProtectedLayout = async ({ children }: PropsWithChildren) => {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="drawer lg:drawer-open typography">
      <input type="checkbox" id="sidebar" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="container max-w-full">
          <header className="mb-4">
            <nav className="navbar">
              <div className="navbar-start">
                <label htmlFor="sidebar" aria-label="Open sidebar" className="btn btn-square btn-ghost">
                  <PanelLeft />
                </label>
              </div>
              <div className="navbar-end">
                <Link href="/profile">
                  <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 size-8 rounded-full ring-2 ring-offset-2">
                      <Image src={session.user.image ?? ""} alt={session.user.name} width={96} height={96} />
                    </div>
                  </div>
                </Link>
              </div>
            </nav>
          </header>
          <main className="px-2 md:px-3 lg:px-4">{children}</main>
        </div>
      </div>
      <SidebarContent />
    </div>
  );
};

export default ProtectedLayout;
