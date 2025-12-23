import { Grid, List } from "lucide-react";

const Unsorted = () => {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl leading-tight font-semibold tracking-tight">Unsorted</h1>
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
    </div>
  );
};

export default Unsorted;
