import React, { useState, useEffect } from "react";
import CustomerSearchBar from "./CustomerSearchBar";
import SearchDropdown from "./SearchDropdown";
import CustomerSearchResults from "./CustomerSearchResults";
import useGetFromAPI from "../hooks/useGetFromAPI";

const searchTypeObjArray = [
  { id: "name", label: "Customer Name" },
  { id: "id", label: "Customer ID" },
];

const CustomerSearch = () => {
  const rowsPerPage = 12;
  const [selectedSearchType, setSelectedSearchType] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    setStartIndex(0);
  }, [searchQuery, selectedSearchType]);
  const endIndex = startIndex + rowsPerPage;
  let totalDataCount;
  let requestPath;
  if (searchQuery) {
    requestPath = `/customers/search?type=${selectedSearchType}&query=${searchQuery}&amount=${rowsPerPage}&offset=${startIndex}`;
  } else {
    requestPath = `/customers/all?offset=${startIndex}&limit=${rowsPerPage}`;
  }
  const { data: customerDataDump, loading, error } = useGetFromAPI(requestPath);

  const customerData = customerDataDump ? customerDataDump.results : [];
  totalDataCount = customerDataDump ? customerDataDump.results_count : 0;

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-primary text-4xl font-semibold">Customer Search</h1>
      <CustomerSearchBar {...{ setSearchQuery }} />
      <SearchDropdown
        {...{ searchTypeObjArray, selectedSearchType, setSelectedSearchType }}
      />
      <CustomerSearchResults
        data={customerData}
        loading={loading}
        error={error}
        searched={searchQuery.length > 0}
      />
      <div className="flex flex-row items-center justify-center gap-4">
        <button
          className={
            startIndex === 0
              ? "btn-std pointer-events-none w-15 opacity-50"
              : "btn-std w-15"
          }
          onClick={() => {
            setStartIndex(startIndex - rowsPerPage);
          }}
        >
          Back
        </button>
        <button
          className={
            endIndex >= totalDataCount
              ? "btn-std pointer-events-none w-15 opacity-50"
              : "btn-std w-15"
          }
          onClick={() => {
            setStartIndex(startIndex + rowsPerPage);
          }}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default CustomerSearch;
