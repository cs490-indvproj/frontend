import React from "react";
import useGetFromAPI from "../hooks/useGetFromAPI.js";
import SearchResults from "./SearchResults.jsx";

const TopFive = ({ searchEntityType, searchResultsGridLayout }) => {
  let requestURI;
  let titleString;
  if (searchEntityType === "actors") {
    requestURI = "/actors/top?amount=5";
    titleString = "View our Top 5 Most Popular Actors";
  } else if (searchEntityType === "films") {
    requestURI = "/films/top?amount=5";
    titleString = "View our Top 5 Rented Films";
  } else {
    requestURI = "";
    titleString = "What are you doing future me";
  }

  const { data, loading, error } = useGetFromAPI(requestURI);

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-primary pt-0 text-center text-4xl font-extrabold">
        {titleString}
      </h1>
      <SearchResults
        {...{ searchEntityType, searchResultsGridLayout, data, loading, error }}
      />
    </section>
  );
};

export default TopFive;
