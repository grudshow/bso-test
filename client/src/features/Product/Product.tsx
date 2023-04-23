import { MouseEvent, useEffect } from 'react'
import { Box, Button, Card, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { productActions } from '../../store/reducers/product/ProductSlice'
import { ProductAttributes } from '../../models/product.model'
import { BackButton } from '../../components/UI/BackButton'
import { getProduct } from '../../store/reducers/product/ProductThunks'

import CheckIcon from '@mui/icons-material/Check'

export const Product = () => {
	const params = useParams<{ id: string }>()
	const product = useAppSelector(state => state.productReducer.product)
	const cart = useAppSelector(state => state.productReducer.cart)

	const dispatch = useAppDispatch()

	const addToCart = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		dispatch(productActions.addToCart(product as ProductAttributes))
	}

	useEffect(() => {
		dispatch(getProduct(Number(params.id)))
	}, [])

	return (
		<Stack gap={2}>
			<BackButton toNavigate={'/products'} title={'товарам'} />
			<Card sx={{ p: 2, cursor: 'pointer' }}>
				<Stack gap={2} height='100%'>
					<Box height={400} sx={{ flex: '1 0 auto' }}>
						<img
							src={import.meta.env.VITE_API_KEY + product?.Image.data.attributes.url}
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
							{product?.Title}
						</Typography>
						<Stack direction='row' alignItems={'center'} justifyContent='space-between'>
							<Typography fontSize={18}>{product?.Price.toLocaleString('ru')} ₽</Typography>
							{cart.find(item => item.Slug === product?.Slug) ? (
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
		</Stack>
	)
}
