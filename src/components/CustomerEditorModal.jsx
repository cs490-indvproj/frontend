import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import usePostToAPI from "../hooks/usePostToAPI";
import usePatchToAPI from "../hooks/usePatchToAPI";
import XIcon from "../assets/XIcon.svg";

const CustomerEditorModal = ({
  open,
  customerData = null,
  onClose,
  refreshSearchResults,
}) => {
  const isAddMode = customerData === null;

  const {
    patchFunction,
    loading: patchLoading,
    error: patchError,
  } = usePatchToAPI();

  const {
    postFunction,
    data: postData,
    loading: postLoading,
    error: postError,
  } = usePostToAPI();

  const loading = postLoading || patchLoading;
  const error = postError || patchError;

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: {
      address: "",
      address2: "",
      district: "",
      city: "",
      postal_code: "",
      country: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (open && customerData) {
      setFormData({
        first_name: customerData?.first_name || "",
        last_name: customerData?.last_name || "",
        email: customerData?.email || "",
        address: {
          address: customerData.address?.address || "",
          address2: customerData.address?.address2 || "",
          district: customerData.address?.district || "",
          city: customerData.address?.city || "",
          postal_code: customerData.address?.postal_code || "",
          country: customerData.address?.country || "",
          phone: customerData.address?.phone || "",
        },
      });
    } else if (open && !customerData) {
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        address: {
          address: "",
          address2: "",
          district: "",
          city: "",
          postal_code: "",
          country: "",
          phone: "",
        },
      });
    }
  }, [open, customerData]);

  const customerUpdate = async (e) => {
    e.preventDefault();
    try {
      if (isAddMode) {
        await postFunction("customers/create", formData);
      } else {
        await patchFunction("customers/update", {
          ...formData,
          customer_id: customerData.customer_id,
        });
      }
      refreshSearchResults();
      onClose();
    } catch (err) {
      console.error("Failed to save customer changes:", err);
    }
  };

  function processChange(e) {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const updatedAddressField = name.split(".")[1];
      setFormData((prevCustomer) => ({
        ...prevCustomer,
        address: { ...prevCustomer.address, [updatedAddressField]: value },
      }));
    } else {
      setFormData((prevCustomer) => ({
        ...prevCustomer,
        [name]: value,
      }));
    }
  }

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
          h-[55%] w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 transform
          flex-col overflow-hidden p-5"
      >
        <div className="flex flex-row justify-between">
          <h1 className="text-primary text-2xl font-bold">
            {isAddMode ? "Add New Customer" : "Edit Customer"}
          </h1>
          <button
            className="btn-std item-center h-5 w-5 justify-center"
            onClick={onClose}
          >
            <img className="h-5 w-5" src={XIcon} alt="Close Popup Button" />
          </button>
        </div>

        <form
          onSubmit={customerUpdate}
          className="mt-6 flex flex-col justify-between gap-2"
        >
          <div className="flex gap-4">
            <div className="flex flex-col gap-1">
              <label
                className="text-primary text-md shrink-0 font-medium
                  text-nowrap"
              >
                First Name:
              </label>
              <label
                className="text-primary text-md shrink-0 font-medium
                  text-nowrap"
              >
                Last Name:
              </label>
              <label
                className="text-primary text-md shrink-0 font-medium
                  text-nowrap"
              >
                Email:
              </label>
              <label
                className="text-primary text-md shrink-0 font-medium
                  text-nowrap"
              >
                Phone Number:
              </label>
            </div>
            <div className="flex w-full flex-col gap-1">
              <input
                required
                name="first_name"
                value={formData.first_name}
                onChange={processChange}
                placeholder="John"
                className="text-foreground border-secondary bg-background w-full
                  rounded-full border px-4"
              ></input>
              <input
                required
                name="last_name"
                value={formData.last_name}
                onChange={processChange}
                placeholder="Doe"
                className="text-foreground border-secondary bg-background w-full
                  rounded-full border px-4"
              ></input>
              <input
                name="email"
                value={formData.email}
                onChange={processChange}
                placeholder="john.doe@mail.net"
                className="text-foreground border-secondary bg-background w-full
                  rounded-full border px-4"
              ></input>
              <input
                required
                name="address.phone"
                value={formData.address.phone}
                onChange={processChange}
                placeholder="2484345508"
                className="text-foreground border-secondary bg-background w-full
                  rounded-full border px-4"
              ></input>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="mt-4 flex flex-col gap-1">
              <h1 className="text-primary mb-4 text-xl font-semibold">
                Address Info
              </h1>
              <div className="flex gap-4">
                <div className="flex flex-col gap-1">
                  <label
                    className="text-primary text-md shrink-0 font-medium
                      text-nowrap"
                  >
                    Street Address:
                  </label>
                  <label
                    className="text-primary text-md shrink-0 font-medium
                      text-nowrap"
                  >
                    Apt, Suite, etc.:
                  </label>
                  <label
                    className="text-primary text-md shrink-0 font-medium
                      text-nowrap"
                  >
                    City:
                  </label>
                  <label
                    className="text-primary text-md shrink-0 font-medium
                      text-nowrap"
                  >
                    State/District:
                  </label>
                  <label
                    className="text-primary text-md shrink-0 font-medium
                      text-nowrap"
                  >
                    Postal Code:
                  </label>
                  <label
                    className="text-primary text-md shrink-0 font-medium
                      text-nowrap"
                  >
                    Country:
                  </label>
                </div>
                <div className="flex w-full flex-col gap-1">
                  <input
                    required
                    name="address.address"
                    value={formData.address.address}
                    onChange={processChange}
                    placeholder="1600 Pennsylvania Avenue"
                    className="text-foreground border-secondary bg-background
                      w-full rounded-full border px-4"
                  ></input>
                  <input
                    name="address.address2"
                    value={formData.address.address2}
                    onChange={processChange}
                    placeholder="Apt, Suite, etc. (Optional)"
                    className="text-foreground border-secondary bg-background
                      w-full rounded-full border px-4"
                  ></input>
                  <input
                    required
                    name="address.city"
                    value={formData.address.city}
                    onChange={processChange}
                    placeholder="City"
                    className="text-foreground border-secondary bg-background
                      w-full rounded-full border px-4"
                  ></input>
                  <input
                    required
                    name="address.district"
                    value={formData.address.district}
                    onChange={processChange}
                    placeholder="Washington"
                    className="text-foreground border-secondary bg-background
                      w-full rounded-full border px-4"
                  ></input>
                  <input
                    required
                    name="address.postal_code"
                    value={formData.address.postal_code}
                    onChange={processChange}
                    placeholder="DC"
                    className="text-foreground border-secondary bg-background
                      w-full rounded-full border px-4"
                  ></input>
                  <input
                    required
                    name="address.country"
                    value={formData.address.country}
                    onChange={processChange}
                    placeholder="United States"
                    className="text-foreground border-secondary bg-background
                      w-full rounded-full border px-4"
                  ></input>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-around">
            <button
              className="btn-std item-center justify-center px-3"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="btn-std item-center justify-center px-3
                disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Customer"}
            </button>
          </div>
        </form>

        {error && <div className="text-red-700">{error}</div>}
      </div>
    </>,
    document.getElementById("portal")
  );
};
export default CustomerEditorModal;
