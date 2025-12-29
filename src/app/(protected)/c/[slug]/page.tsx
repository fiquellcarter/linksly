"use client";

import { Grid, List, Settings } from "lucide-react";
import { useParams } from "next/navigation";

import { api } from "~/trpc/react";

const Page = () => {
  const params = useParams<{ slug: string }>();

  const { data: collection } = api.collection.bySlug.useQuery({ slug: params.slug });
  console.log("collection:", collection);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl leading-tight font-semibold tracking-tight">{collection?.name}</h1>
          {/* TODO: change the number of bookmarks dynamically */}
          <p className="text-base-content/80 leading-relaxed">
            {collection?.description} {collection?.description && "•"} 6 bookmarks
          </p>
        </div>
        {/* TODO: make these buttons work */}
        <div className="flex items-center gap-4">
          <button type="button" className="btn">
            <Settings />
            Settings
          </button>
          <div className="join">
            <button type="button" aria-label="Grid view" className="btn btn-primary btn-active btn-square join-item">
              <Grid />
            </button>
            <button type="button" aria-label="List view" className="btn btn-square join-item">
              <List />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
