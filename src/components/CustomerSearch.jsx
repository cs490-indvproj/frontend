import React, { useState, useEffect } from "react";
import CustomerSearchBar from "./CustomerSearchBar";
import SearchDropdown from "./SearchDropdown";
import CustomerSearchResults from "./CustomerSearchResults";
import useGetFromAPI from "../hooks/useGetFromAPI";
import CustomerEditorModal from "./CustomerEditorModal";

const searchTypeObjArray = [
  { id: "name", label: "Customer Name" },
  { id: "id", label: "Customer ID" },
];

const CustomerSearch = () => {
  const rowsPerPage = 12;
  const [selectedSearchType, setSelectedSearchType] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [startIndex, setStartIndex] = useState(0);

  const [isRefresh, setIsRefresh] = useState(false);

  const [isAddActive, setIsAddActive] = useState(false);

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
  const {
    data: customerDataDump,
    loading,
    error,
  } = useGetFromAPI(requestPath, isRefresh);

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
        refreshSearchResults={() => setIsRefresh(!isRefresh)}
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
      <button
        className="btn-std item-center justify-center px-3"
        onClick={() => setIsAddActive(true)}
      >
        Add New Customer
      </button>
      <CustomerEditorModal
        open={isAddActive}
        onClose={() => setIsAddActive(false)}
        refreshSearchResults={() => setIsRefresh(!isRefresh)}
      />
    </section>
  );
};

export default CustomerSearch;
