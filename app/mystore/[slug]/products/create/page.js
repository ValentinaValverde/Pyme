import React from 'react'
import CreateProductForm from '@/components/CreateProductForm'

const createProductPage = ({ params }) => {
	return <CreateProductForm myStore={params.slug} />
}

export default createProductPage
