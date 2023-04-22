import { Stack, AppBar, Toolbar, Typography, Container, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../../hooks/redux'
import { authActions } from '../../../store/reducers/auth/AuthSlice'
import { userActions } from '../../../store/reducers/user/UserSlice'
import { Cart } from './modules/Cart/Cart'

export const Header = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const logout = () => {
		dispatch(userActions.setLoginUser({ identifier: '', password: '' }))
		dispatch(userActions.setRegisterUser({ username: '', password: '', email: '' }))
		dispatch(authActions.logout())
		navigate('/login')
	}

	return (
		<AppBar position='static'>
			<Toolbar>
				<Container maxWidth='xl'>
					<Stack
						direction={'row'}
						alignItems='center'
						justifyContent={'space-between'}
						sx={{ width: '100%' }}
					>
						<Typography variant='h6'>BSO</Typography>
						<Stack direction={'row'} gap={4}>
							<Cart />
							<Button variant='contained' color='warning' onClick={logout}>
								Выйти
							</Button>
						</Stack>
					</Stack>
				</Container>
			</Toolbar>
		</AppBar>
	)
}
