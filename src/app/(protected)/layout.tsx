import { Folders, GalleryVerticalEnd, Inbox, PanelLeft, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

import { getSession } from "~/server/better-auth/server";

const navigations = [
  { name: "All", icon: GalleryVerticalEnd, url: "/app" },
  { name: "Unsorted", icon: Inbox, url: "/unsorted" },
];

const ProtectedLayout = async ({ children }: PropsWithChildren) => {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="drawer lg:drawer-open">
      <input type="checkbox" id="sidebar" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="container max-w-full">
          <header className="mb-4">
            <nav className="navbar">
              <div className="navbar-start">
                <label htmlFor="sidebar" aria-label="Open sidebar" className="btn btn-square btn-ghost">
                  <PanelLeft className="my-1.5 inline-block" />
                </label>
              </div>
              <div className="navbar-end">
                <Link href="/profile">
                  <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
                      <Image src={session.user.image ?? ""} alt={session.user.name} width={96} height={96} />
                    </div>
                  </div>
                </Link>
              </div>
            </nav>
          </header>
          <main>{children}</main>
        </div>
      </div>
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="sidebar" aria-label="Close sidebar" className="drawer-overlay"></label>
        <div className="bg-base-200 is-drawer-close:w-14 is-drawer-open:w-72 flex min-h-dvh flex-col items-start">
          <ul className="menu w-full grow">
            {navigations.map((navigation) => (
              <li key={navigation.name}>
                <Link
                  href={navigation.url}
                  role="button"
                  data-tip={navigation.name}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right">
                  <navigation.icon className="my-1.5 inline-block" />
                  <span className="is-drawer-close:hidden">{navigation.name}</span>
                </Link>
              </li>
            ))}
            <li className="menu-title is-drawer-close:hidden">Collections</li>
            {Array.from({ length: 5 }).map((_, index) => (
              <li key={index}>
                <Link
                  href="#"
                  role="button"
                  data-tip="Design"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right">
                  <Folders className="my-1.5 inline-block" />
                  <span className="is-drawer-close:hidden">Design</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                data-tip="Add Collection"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-base-content/60">
                <Plus className="my-1.5 inline-block" />
                <span className="is-drawer-close:hidden">Add Collection</span>
              </button>
            </li>
            <li className="mt-auto">
              <button
                type="button"
                data-tip="Add Bookmark"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right btn btn-primary is-drawer-close:btn-square">
                <Plus className="my-1.5 inline-block" />
                <span className="is-drawer-close:hidden">Add Bookmark</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProtectedLayout;
