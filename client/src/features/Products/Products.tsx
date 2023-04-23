import { useEffect } from 'react'
import { Box, Typography } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { getProducts } from '../../store/reducers/product/ProductThunks'
import { ProductsItem } from './components/ProductsItem'
import { ProductsSkeleton } from './components/ProductsSkeleton'

export const Products = () => {
	const dispatch = useAppDispatch()
	const products = useAppSelector(state => state.productReducer.products)
	const status = useAppSelector(state => state.productReducer.status)

	useEffect(() => {
		dispatch(getProducts())
	}, [])

	const renderProducts = () => {
		if (status === 'loading' || status === 'init')
			return Array.from(new Array(8)).map((_, idx) => <ProductsSkeleton key={idx} />)

		return products && products.length ? (
			products.map(product => (
				<ProductsItem
					key={product.attributes.Slug}
					id={product.id}
					attributes={product.attributes}
				/>
			))
		) : (
			<Typography variant='h2'>Нет данных</Typography>
		)
	}

	return (
		<Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: 'repeat(4,1fr)' }}>
			{renderProducts()}
		</Box>
	)
}
