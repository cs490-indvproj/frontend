import React from "react";
import toTitleCase from "../utils/formatting";
import ButtonActorDetails from "./ButtonActorDetails";
const SearchResultsActors = ({ data, searchResultsGridLayout }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        style={{
          gridTemplateColumns: `repeat(${searchResultsGridLayout.length}, minmax(0, 1fr))`,
        }}
        className={`border-secondary grid w-full items-center border border-2
          font-bold`}
      >
        {searchResultsGridLayout.map((option) => (
          <div
            key={option.id}
            className={`border-secondary h-full w-full content-center
            items-center border px-4 py-2 text-center`}
          >
            {option.label}
          </div>
        ))}
      </div>
      {data.map((option) => (
        <div
          key={option.actor_id}
          className="border-secondary grid w-full items-center border py-2"
          style={{
            gridTemplateColumns: `repeat(${searchResultsGridLayout.length}, minmax(0, 1fr))`,
          }}
        >
          <div className="text-center">{toTitleCase(option.first_name)}</div>
          <div className="text-center">{toTitleCase(option.last_name)}</div>
          <div className="text-center">{option.actor_id}</div>
          <div className="text-center">{option.film_count}</div>
          <ButtonActorDetails buttonActorID={option.actor_id} />
        </div>
      ))}
    </div>
  );
};

export default SearchResultsActors;
