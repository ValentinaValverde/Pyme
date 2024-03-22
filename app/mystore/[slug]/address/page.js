import React from "react";
import EditStoreAddressForm from "@/components/edit-forms/EditStoreAddressForm";
import { getMyStoreInfo } from "@/utils/actions/storeActions";

const editStoreAddressPage = async ({ params }) => {
  const storeInfo = await getMyStoreInfo(params.slug);
  return (
    <>
      <EditStoreAddressForm storeInfo={storeInfo} myStore={params.slug} />
    </>
  );
};

export default editStoreAddressPage;
