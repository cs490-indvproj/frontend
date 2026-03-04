import React from "react";
import toTitleCase from "../utils/formatting";
import CustomerButton from "./CustomerButton";

const borderVariants = {
  none: "bg-surface border-secondary h-1/2 ",
  bordered: "bg-surface border-secondary h-1/2  border",
};

const searchResultsGridLayout = [
  { id: "fName", label: "First Name" },
  { id: "lName", label: "Last Name" },
  { id: "cid", label: "Customer ID" },
  { id: "details", label: "See Details" },
];

const CustomerSearchResults = ({ data, loading, error, searched = false }) => {
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
                gridTemplateColumns: `repeat(${searchResultsGridLayout.length}, minmax(0, 1fr))`,
              }}
              className={`border-secondary grid w-full items-center border
              border-2 font-bold`}
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
                key={option.customer_id}
                className="border-secondary grid w-full items-center border
                  py-2"
                style={{
                  gridTemplateColumns: `repeat(${searchResultsGridLayout.length}, minmax(0, 1fr))`,
                }}
              >
                <div className="text-center">
                  {toTitleCase(option.first_name)}
                </div>
                <div className="text-center">
                  {toTitleCase(option.last_name)}
                </div>
                <div className="text-center">{option.customer_id}</div>
                <CustomerButton buttonCustomerID={option.customer_id} />
              </div>
            ))}
          </div>
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

export default CustomerSearchResults;
