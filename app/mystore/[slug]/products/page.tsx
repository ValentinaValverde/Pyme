import React from "react";
import ProductList from "@/components/ProductList";
import Sidebar from "@/components/Sidebar";
import { Box } from "@mui/material";

const myProductsPage = ({ params }) => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar storeSlug={params.slug} />
        <Box component={"main"} sx={{ flexGrow: 1, p: 3 }}>
          <ProductList myStore={params.slug} />
        </Box>
      </Box>
    </>
  );
};

export default myProductsPage;
