import React from 'react'
import CreateProductForm from '@/components/CreateProductForm'

const createProductPage = ({ params }) => {
	console.log(params.slug)
	return <CreateProductForm myStore={params.slug} />
}

export default createProductPage
