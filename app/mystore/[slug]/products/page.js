import React from "react";
import ProductList from "@/components/ProductList";

const myProductsPage = ({ params }) => {
  return <ProductList myStore={params.slug} />;
};

export default myProductsPage;
