"use client";

import { ChartNoAxesGantt, Folders, GalleryVerticalEnd, Inbox, Plus } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import AddCollectionDialog from "~/components/add-collection-dialog";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

const navigations = [
  { name: "All", icon: GalleryVerticalEnd, url: "/app" },
  { name: "Unsorted", icon: Inbox, url: "/unsorted" },
];

const SidebarContent = () => {
  const { data: collections = [] } = api.collection.list.useQuery();

  const addCollectionDialogRef = useRef<HTMLDialogElement | null>(null);

  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
      <label htmlFor="sidebar" aria-label="Close sidebar" className="drawer-overlay"></label>
      <div className="bg-base-200 is-drawer-close:w-14 is-drawer-open:w-72 flex min-h-dvh flex-col">
        <ul className="menu w-full grow">
          <li className="border-base-content/10 mb-4 border-b pb-2">
            <Link
              href="/app"
              role="button"
              data-tip="Linksly"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right">
              <ChartNoAxesGantt className="is-drawer-close:size-4 text-primary my-1.5 inline-block size-5" />
              <span className="is-drawer-close:hidden text-lg font-medium">Linksly</span>
            </Link>
          </li>
          {navigations.map((navigation, idx) => (
            <li key={idx}>
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
          <li className="menu-title is-drawer-close:hidden mt-4">Collections</li>
          {collections.map((collection, idx) => (
            <li key={idx}>
              <Link
                href={`/c/${collection.slug}`}
                role="button"
                data-tip={collection.name}
                className={cn(
                  "is-drawer-close:tooltip is-drawer-close:tooltip-right",
                  idx === 0 && "is-drawer-close:mt-4"
                )}>
                <Folders className="my-1.5 inline-block" />
                <span className="is-drawer-close:hidden">{collection.name}</span>
              </Link>
            </li>
          ))}
          <li className={cn("mb-4", collections && "mt-2")}>
            <button
              type="button"
              data-tip="Add Collection"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-base-content/60"
              onClick={() => addCollectionDialogRef.current?.showModal()}>
              <Plus className="my-1.5 inline-block" />
              <span className="is-drawer-close:hidden">Add Collection</span>
            </button>
          </li>
          <li className="border-base-content/10 mt-auto border-t pt-2">
            <button
              type="button"
              data-tip="Add Bookmark"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-close:btn-square btn btn-primary">
              <Plus className="my-1.5 inline-block" />
              <span className="is-drawer-close:hidden">Add Bookmark</span>
            </button>
          </li>
        </ul>
      </div>
      <AddCollectionDialog ref={addCollectionDialogRef} />
    </div>
  );
};

export default SidebarContent;
