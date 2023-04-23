import { useState, MouseEvent } from 'react'
import { Badge, Box, IconButton, Menu, Stack, Tooltip, Typography } from '@mui/material'

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux'
import { productActions } from '../../../../../store/reducers/product/ProductSlice'

export const Cart = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const cart = useAppSelector(state => state.productReducer.cart)

	const dispatch = useAppDispatch()

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
	const handleClose = () => setAnchorEl(null)

	const deleteToCart = (Slug: string) => dispatch(productActions.deleteToCart(Slug))

	const totalCountCart = () => {
		let total = 0
		cart.forEach(item => {
			total += item.Price
		})
		return total.toLocaleString('ru')
	}

	return (
		<>
			<IconButton size='large' color='inherit' onClick={handleClick}>
				<Badge badgeContent={cart.length} color='error'>
					<ShoppingCartIcon />
				</Badge>
			</IconButton>
			<Menu
				onClose={handleClose}
				PaperProps={{
					sx: { py: 1, px: 2, maxHeight: 400, maxWidth: 400 },
				}}
				anchorEl={anchorEl}
				open={open}
			>
				{cart && cart.length ? (
					<Stack gap={1}>
						<Stack gap={1}>
							<Typography variant='h5'>Корзина</Typography>
							<Stack gap={1}>
								{cart.map((item, idx) => (
									<Stack
										sx={{
											borderTop: t => `1px solid ${t.palette.grey[300]}`,
											borderBottom: t => `1px solid ${t.palette.grey[300]}`,
											py: 1,
										}}
										key={idx}
										direction={'row'}
										gap={2}
										alignItems='center'
										justifyContent={'space-between'}
									>
										<Stack direction={'row'} alignItems='center' gap={2}>
											<img
												style={{
													objectFit: 'cover',
													objectPosition: 'center',
												}}
												width={60}
												src={import.meta.env.VITE_API_KEY + item.Image.data.attributes.url}
												alt='image'
											/>
											<Box>
												<Typography fontSize={16} maxWidth={300}>
													{item.Title}
												</Typography>
												<Typography>{item.Price.toLocaleString('ru')} ₽</Typography>
											</Box>
										</Stack>
										<Tooltip title='Удалить товар'>
											<IconButton onClick={() => deleteToCart(item.Slug)}>
												<DeleteIcon color='error' />
											</IconButton>
										</Tooltip>
									</Stack>
								))}
							</Stack>
						</Stack>
						<Stack direction='row' alignItems='center' justifyContent={'space-between'}>
							<Typography>Общее</Typography>
							<Typography fontWeight={700}>{totalCountCart()} ₽</Typography>
						</Stack>
					</Stack>
				) : (
					'Нет товаров'
				)}
			</Menu>
		</>
	)
}
