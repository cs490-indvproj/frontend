import React from "react";
import useGetFromAPI from "../hooks/useGetFromAPI.js";
import SearchResults from "./SearchResults.jsx";

const searchResultsGridLayout = [
  { id: "name", label: "Film Name" },
  { id: "id", label: "Film ID" },
  { id: "details", label: "See Details" },
];

const TopFiveFilms = () => {
  const { data, loading, error } = useGetFromAPI("/films/top?amount=5");

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-primary pt-0 text-center text-4xl font-extrabold">
        View our Top 5 Rented Films
      </h1>
      <SearchResults
        {...{ searchResultsGridLayout, data, loading, error }}
      ></SearchResults>
    </section>
  );
};

export default TopFiveFilms;
