import React, { useState } from "react";
import { createPortal } from "react-dom";
import CustomerInfo from "./CustomerInfo";
import CustomerRentals from "./CustomerRentals";
import useGetFromAPI from "../hooks/useGetFromAPI";
import usePatchToAPI from "../hooks/usePatchToAPI";
import useDeleteFromAPI from "../hooks/useDeleteFromAPI";
import toTitleCase from "../utils/formatting";
import XIcon from "../assets/XIcon.svg";

const CustomerModal = ({
  open,
  modalCustomerID,
  onClose,
  refreshSearchResults,
}) => {
  const [isRefresh, setIsRefresh] = useState(false);
  const {
    patchFunction,
    loading: returnLoading,
    error: returnError,
  } = usePatchToAPI();

  const {
    deleteFunction,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteFromAPI();

  let customerRequestPath;
  if (open && modalCustomerID) {
    customerRequestPath = `customers/${modalCustomerID}`;
  } else {
    customerRequestPath = null;
  }

  let rentalRequestPath;
  if (open && modalCustomerID) {
    rentalRequestPath = `rentals/history?customer_id=${modalCustomerID}`;
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
      await patchFunction("rentals/return", { rental_id: rentalID });
      setIsRefresh(!isRefresh);
    } catch (err) {
      console.error("Failed to return film:", err);
    }
  };

  const deleteCustomer = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${toTitleCase(customerData.first_name)} ${toTitleCase(customerData.last_name)}?`
      )
    ) {
      try {
        await deleteFunction("customers/delete", {
          customer_id: modalCustomerID,
        });
        refreshSearchResults();
        onClose();
      } catch (err) {
        console.error("Failed to delete Customer:", err);
      }
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
        className="text-foreground bg-surface fixed top-1/2 left-1/2 z-50 flex
          h-[80%] w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 transform
          flex-col overflow-hidden p-5"
      >
        {loading && <div className="text-xl font-medium">Loading data...</div>}
        {error && (
          <div className="text-red-700">{customerError || rentalError}</div>
        )}
        {returnError && (
          <div className="text-red-700">
            Error returning film: {returnError}
          </div>
        )}
        {deleteError && (
          <div className="text-red-700">
            Error deleting customer: {deleteError}
          </div>
        )}

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
                  className="btn-std hover:text-foreground px-2 py-1
                    hover:bg-red-600"
                  disabled={deleteLoading}
                  onClick={deleteCustomer}
                >
                  Delete Customer
                </button>
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
              <CustomerInfo {...{ customerData }} />
            </div>

            <CustomerRentals
              {...{ rentalData, returnLoading, patchReturnRental }}
            />
          </div>
        )}
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default CustomerModal;
