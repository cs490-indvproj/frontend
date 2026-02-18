import React from "react";
import TopFive from "./TopFive";

const searchResultsGridLayout = [
  { id: "name", label: "Film Name" },
  { id: "id", label: "Film ID" },
  { id: "details", label: "See Details" },
];

const searchEntityType = "films";
const TopFiveFilms = () => {
  return <TopFive {...{ searchEntityType, searchResultsGridLayout }} />;
};

export default TopFiveFilms;
