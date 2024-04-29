import React from 'react';
import CreateProductForm from '@/components/create-forms/CreateProductForm';

const createProductPage = ({ params }) => {
  return <CreateProductForm myStore={params.slug} />;
};

export default createProductPage;
