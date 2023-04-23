import { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Card, Stack, Typography } from '@mui/material'

import { ProductResponse } from '../../../models/product.model'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { productActions } from '../../../store/reducers/product/ProductSlice'

import CheckIcon from '@mui/icons-material/Check'

export const ProductsItem = (props: ProductResponse) => {
	const {
		attributes: { Slug, Title, Price, Image },
		id,
	} = props

	const cart = useAppSelector(state => state.productReducer.cart)

	const navigate = useNavigate()

	const dispatch = useAppDispatch()

	const addToCart = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		dispatch(productActions.addToCart({ ...props.attributes }))
	}

	const navigateToProduct = () => navigate(`/products/${id}`)

	return (
		<Card sx={{ p: 2, cursor: 'pointer' }} onClick={navigateToProduct}>
			<Stack gap={2} height='100%'>
				<Box height={400} sx={{ flex: '1 0 auto' }}>
					<img
						src={import.meta.env.VITE_API_KEY + Image.data.attributes.url}
						height='100%'
						loading='lazy'
						width='100%'
						style={{
							objectFit: 'contain',
							objectPosition: 'center',
						}}
						alt='product'
					/>
				</Box>
				<Stack gap={4} height='100%'>
					<Typography sx={{ flex: '1 0 auto' }} fontSize={20} fontWeight={700}>
						{Title}
					</Typography>
					<Stack direction='row' alignItems={'center'} justifyContent='space-between'>
						<Typography fontSize={18}>{Price.toLocaleString('ru')} ₽</Typography>
						{cart.find(item => item.Slug === Slug) ? (
							<Button
								onClick={e => e.stopPropagation()}
								startIcon={<CheckIcon />}
								variant='contained'
								color='success'
							>
								Добавлен в корзину
							</Button>
						) : (
							<Button onClick={addToCart} variant='contained'>
								Добавить в корзину
							</Button>
						)}
					</Stack>
				</Stack>
			</Stack>
		</Card>
	)
}
