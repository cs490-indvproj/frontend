import React from "react";
import SearchResultsFilms from "./SearchResultsFilms.jsx";
import SearchResultsActors from "./SearchResultsActors.jsx";

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
}) => {
  console.log(data);
  console.log(data?.length);

  let borderType =
    data && data?.length > 0 ? borderVariants.bordered : borderVariants.none;

  return (
    <div className={borderType}>
      <div className="text-foreground">
        {loading && <div className="text-xl font-medium">Loading...</div>}
        {error && <div className="text-red-700">{error}</div>}
        {data?.length > 0 && (
          <div className="flex flex-col items-center justify-center">
            <div
              style={{
                gridTemplateColumns: `repeat(${searchResultsGridLayout.length + 2}, minmax(0, 1fr))`,
              }}
              className={`border-secondary grid w-full items-center border
              border-2 font-bold`}
            >
              {searchResultsGridLayout.map((option) => (
                <div
                  key={option.id}
                  className={
                    `border-secondary h-full w-full content-center items-center
                    border px-4 py-2 text-center` +
                    (option.id === "name" ? " col-span-3" : "")
                  }
                >
                  {option.label}
                </div>
              ))}
            </div>
            {searchEntityType === "films" && (
              <SearchResultsFilms {...{ data, searchResultsGridLayout }} />
            )}
            {searchEntityType === "actors" && (
              <SearchResultsActors {...{ data, searchResultsGridLayout }} />
            )}
          </div>
        )}
        {data?.length === 0 && (
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
