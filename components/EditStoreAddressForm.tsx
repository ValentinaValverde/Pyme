"use client";
import React from "react";
import { editStoreAddresss } from "@/utils/actions/storeActions";

const EditStoreAddressForm = ({ storeInfo, myStore }: any) => {
  const { streetAddress, city, state, zipcode } = storeInfo;
  return (
    <form action={editStoreAddresss}>
      <div className="join w-full">
        <input
          className="input input-bordered join-item w-full"
          placeholder="Street Address"
          type="text"
          defaultValue={streetAddress}
          name="streetAddress"
          required
        />
        <input
          className="input input-bordered join-item w-full"
          placeholder="City"
          type="text"
          defaultValue={city}
          name="city"
          required
        />
        <input
          className="input input-bordered join-item w-full"
          placeholder="State"
          type="text"
          defaultValue={state}
          name="state"
          required
        />
        <input
          className="input input-bordered join-item w-full"
          placeholder="Zip Code"
          type="text"
          defaultValue={zipcode}
          name="zipcode"
          required
        />
        <input type="hidden" name="myStore" value={myStore} />
        <button type="submit" className="btn join-item btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default EditStoreAddressForm;
