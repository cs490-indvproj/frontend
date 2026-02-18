import React from "react";
import SearchResultsFilms from "./SearchResultsFilms.jsx";
import SearchResultsActors from "./SearchResultsActors.jsx";
import SearchResultsActorFilms from "./SearchResultsActorFilms.jsx";

const borderVariants = {
  none: "bg-surface border-secondary h-1/2 ",
  bordered: "bg-surface border-secondary h-1/2  border",
};

const SearchResults = ({
  searchEntityType,
  searchResultsGridLayout,
  data,
  loading,
  error,
  searched = false,
}) => {
  let borderType =
    data && data?.length > 0 ? borderVariants.bordered : borderVariants.none;

  return (
    <div className={borderType}>
      <div className="text-foreground">
        {loading && <div className="text-xl font-medium">Loading...</div>}
        {error && <div className="text-red-700">{error}</div>}
        {data?.length > 0 && (
          <>
            {searchEntityType === "films" && (
              <SearchResultsFilms {...{ data, searchResultsGridLayout }} />
            )}
            {searchEntityType === "actors" && (
              <SearchResultsActors {...{ data, searchResultsGridLayout }} />
            )}
            {searchEntityType === "actor films" && (
              <SearchResultsActorFilms {...{ data, searchResultsGridLayout }} />
            )}
          </>
        )}
        {data?.length === 0 && searched && (
          <div className="bg-background flex items-center justify-center">
            <p className="text-accent bg-surface rounded-full p-2">
              No Results Found!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
