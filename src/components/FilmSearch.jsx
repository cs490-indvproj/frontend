import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SearchDropdown from "./SearchDropdown";
import SearchResults from "./SearchResults";
import useGetFromAPI from "../hooks/useGetFromAPI";

const searchTypeObjArray = [
  { id: "title", label: "Film Name" },
  { id: "actor", label: "Actor Name" },
  { id: "genre", label: "Film Genre" },
];

const searchResultsGridLayout = [
  { id: "name", label: "Film Name" },
  { id: "id", label: "Film ID" },
  { id: "details", label: "See Details" },
];

const searchEntityType = "films";

const FilmSearch = () => {
  const [selectedSearchType, setSelectedSearchType] = useState("title");
  const [searchQuery, setSearchQuery] = useState("");
  let requestPath;
  if (searchQuery) {
    requestPath = `/films/search?type=${selectedSearchType}&query=${searchQuery}`;
  } else {
    requestPath = null;
  }
  const { data, loading, error } = useGetFromAPI(requestPath);

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-primary text-4xl font-semibold">Film Search</h1>
      <SearchBar {...{ setSearchQuery }}></SearchBar>
      <SearchDropdown
        {...{ searchTypeObjArray, selectedSearchType, setSelectedSearchType }}
      ></SearchDropdown>
      <SearchResults
        {...{ searchEntityType, searchResultsGridLayout, data, loading, error }}
      ></SearchResults>
    </section>
  );
};

export default FilmSearch;
