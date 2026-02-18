import React from "react";

import TopFive from "./TopFive.jsx";

const searchResultsGridLayout = [
  { id: "fName", label: "First Name" },
  { id: "lName", label: "Last Name" },
  { id: "id", label: "Actor ID" },
  { id: "film_count", label: "Film Count" },
  { id: "details", label: "Most Popular Films" },
];
const searchEntityType = "actors";
const TopFiveActors = () => {
  return <TopFive {...{ searchEntityType, searchResultsGridLayout }} />;
};

export default TopFiveActors;
