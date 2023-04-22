import { ChangeEvent, useEffect } from 'react'
import { TextField, Button, Typography, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { useActionCreatorsTyped, useAppSelector } from '../../hooks/redux'
import { authActions } from '../../store/reducers/auth/AuthSlice'
import { userActions } from '../../store/reducers/user/UserSlice'
import { loginUser } from '../../store/reducers/auth/AuthThunks'

export const Login = () => {
	const loginUserState = useAppSelector(state => state.userReducer.loginUserState)
	const status = useAppSelector(state => state.authReducer.status)
	const token = useAppSelector(state => state.authReducer.token)
	const user = useAppSelector(state => state.authReducer.user)

	const actions = useActionCreatorsTyped({ ...authActions, ...userActions, loginUser })

	const navigate = useNavigate()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target

		actions.setLoginUser({ ...loginUserState, [name]: value })
	}

	useEffect(() => {
		if (token && user) {
			navigate('/products')
		}
	}, [])

	const handleClick = async () => {
		await actions
			.loginUser({ identifier: loginUserState.identifier, password: loginUserState.password })
			.finally(() => {
				navigate('/products')
			})
	}

	return (
		<Stack minHeight={'100vh'} alignItems={'center'} justifyContent='center'>
			<Stack gap={2}>
				<Typography variant='h2'>Вход</Typography>
				<Stack gap={2}>
					<TextField
						value={loginUserState.identifier}
						required
						name='identifier'
						label='Логин или почта'
						onChange={handleChange}
					/>
					<TextField
						value={loginUserState.password}
						required
						type={'password'}
						name='password'
						label='Пароль'
						onChange={handleChange}
					/>
					<Button
						onClick={handleClick}
						disabled={status === 'loading'}
						fullWidth
						size='large'
						variant='contained'
					>
						{status === 'loading' ? 'Загрузка...' : 'Войти'}
					</Button>
				</Stack>
			</Stack>
		</Stack>
	)
}
