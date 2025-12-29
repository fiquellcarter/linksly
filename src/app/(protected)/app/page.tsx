"use client";

import { Bookmark, Grid, List } from "lucide-react";

import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";

const App = () => {
  const { data: bookmark = [] } = api.bookmark.list.useQuery();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl leading-tight font-semibold tracking-tight">All</h1>
          {/* TODO: change the number of bookmarks dynamically */}
          <p className="text-base-content/80 leading-relaxed">You have 6 bookmarks saved here.</p>
        </div>
        {/* TODO: make these buttons work */}
        <div className="join">
          <button type="button" aria-label="Grid view" className="btn btn-primary btn-active btn-square join-item">
            <Grid />
          </button>
          <button type="button" aria-label="List view" className="btn btn-square join-item">
            <List />
          </button>
        </div>
      </div>
      {bookmark.length > 0 ? (
        <p>Lorem</p>
      ) : (
        <div className="card mx-auto my-24 w-full max-w-md md:my-48">
          <figure className="pt-10">
            <div className={cn("bg-base-200 rounded-field flex size-10 items-center justify-center")}>
              <Bookmark className="text-primary size-5" />
            </div>
          </figure>
          <div className="card-body text-center">
            <h2 className="text-xl leading-tight font-semibold tracking-tight">No Bookmarks Yet</h2>
            <p className="text-base-content/80 leading-relaxed">
              You don&apos;t have any bookmarks to show right now. Start adding your favorite links to see them here!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
