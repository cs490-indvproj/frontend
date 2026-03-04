import React, { useState } from "react";
import { createPortal } from "react-dom";
import useGetFromAPI from "../hooks/useGetFromAPI";
import usePatchToAPI from "../hooks/usePatchToAPI";
import toTitleCase from "../utils/formatting";
import XIcon from "../assets/XIcon.svg";

const searchResultsGridLayout = [
  { id: "name", label: "Film Name" },
  { id: "id", label: "Film ID" },
  { id: "return", label: "Return Status" },
];

const CustomerModal = ({ open, modalCustomerID, onClose }) => {
  const [isRefresh, setIsRefresh] = useState(false);
  const {
    patchFunction,
    loading: returnLoading,
    error: returnError,
  } = usePatchToAPI();

  let customerRequestPath;
  if (open && modalCustomerID) {
    customerRequestPath = `/customers/${modalCustomerID}`;
  } else {
    customerRequestPath = null;
  }

  let rentalRequestPath;
  if (open && modalCustomerID) {
    rentalRequestPath = `/rentals/history?customer_id=${modalCustomerID}`;
  } else {
    rentalRequestPath = null;
  }

  const {
    data: customerData,
    loading: customerLoading,
    error: customerError,
  } = useGetFromAPI(customerRequestPath, isRefresh);
  const {
    data: rentalData,
    loading: rentalLoading,
    error: rentalError,
  } = useGetFromAPI(rentalRequestPath, isRefresh);

  const loading = customerLoading || rentalLoading;
  const error = customerError || rentalError;

  const patchReturnRental = async (rentalID) => {
    try {
      await patchFunction("/rentals/return", { rental_id: rentalID });
      setIsRefresh(!isRefresh);
    } catch (err) {
      console.error("Failed to return film:", err);
    }
  };

  if (!open) {
    return null;
  }

  return createPortal(
    <>
      <div
        className="fixed top-0 right-0 bottom-0 left-0 z-50 bg-black opacity-70"
        onClick={onClose}
      />
      <div
        className="text-foreground bg-surface flex-fol fixed top-1/2 left-1/2
          z-50 flex h-[80%] w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2
          transform overflow-hidden p-5"
      >
        {loading && <div className="text-xl font-medium">Loading data...</div>}
        {error && (
          <div className="text-red-700">{customerError || rentalError}</div>
        )}
        {returnError && <div className="text-red-700">{returnError}</div>}
        {!loading && !error && customerData && (
          <div className="flex h-full flex-col">
            <div className="shrink-0">
              <div className="flex flex-row justify-between">
                <h1 className="text-primary text-2xl font-semibold">
                  {toTitleCase(
                    customerData.first_name + " " + customerData.last_name
                  )}
                </h1>
                <button
                  className="btn-std item-center h-5 w-5 justify-center"
                  onClick={onClose}
                >
                  <img
                    className="h-5 w-5"
                    src={XIcon}
                    alt="Close Popup Button"
                  />
                </button>
              </div>
              <div>
                <div className="mt-2 flex gap-2">
                  <h1 className="text-primary text-lg">Customer ID:</h1>
                  <p className="text-lg">{customerData.customer_id}</p>
                </div>
                {customerData.email && (
                  <div className="mt-2 flex gap-2">
                    <h1 className="text-primary text-lg">Email:</h1>
                    <p className="text-lg">
                      {customerData.email.toLowerCase()}
                    </p>
                  </div>
                )}
                <div>
                  <h1 className="text-primary mt-2 text-lg">Address:</h1>
                  <p>{customerData.address.address}</p>
                  <p>{customerData.address?.address2}</p>
                  <p>
                    {customerData.address.city}, {customerData.address.district}{" "}
                    {customerData.address?.postal_code}
                  </p>
                  <p>{customerData.address.country}</p>
                </div>
              </div>
            </div>

            <div
              className="mt-4 flex min-h-0 flex-grow flex-col items-center
                justify-center overflow-hidden"
            >
              <div
                style={{
                  gridTemplateColumns: `repeat(${searchResultsGridLayout.length + 3}, minmax(0, 1fr))`,
                }}
                className={`border-secondary grid w-full shrink-0 items-center
                border border-2 font-bold`}
              >
                {searchResultsGridLayout.map((option) => (
                  <div
                    key={option.id}
                    className={
                      `border-secondary h-full w-full content-center
                      items-center border py-2 text-center` +
                      (option.id === "name" ? " col-span-3" : "") +
                      (option.id === "return" ? " col-span-2" : "")
                    }
                  >
                    {option.label}
                  </div>
                ))}
              </div>
              <div className="flex-grow overflow-y-auto">
                {[...rentalData].reverse().map((option) => (
                  <div
                    key={option.film.film_id}
                    className="border-secondary grid w-full items-center border
                      py-2"
                    style={{
                      gridTemplateColumns: `repeat(${searchResultsGridLayout.length + 3}, minmax(0, 1fr))`,
                    }}
                  >
                    <div className="col-span-3 text-center">
                      {toTitleCase(option.film.title)}
                    </div>
                    <div className="text-center">{option.film.film_id}</div>

                    <div className="col-span-2 text-center">
                      {option.return_date ? (
                        option.return_date
                      ) : (
                        <div className="text-center">
                          <button
                            className="btn-std px-2 py-1"
                            disabled={returnLoading}
                            onClick={() => patchReturnRental(option.rental_id)}
                          >
                            Return Film
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default CustomerModal;
