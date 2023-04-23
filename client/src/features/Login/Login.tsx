import { ChangeEvent, useEffect } from 'react'
import { TextField, Button, Typography, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { useActionCreatorsTyped, useAppSelector } from '../../hooks/redux'
import { authActions } from '../../store/reducers/auth/AuthSlice'
import { userActions } from '../../store/reducers/user/UserSlice'
import { loginUser } from '../../store/reducers/auth/AuthThunks'
import { BackButton } from '../../components/UI/BackButton'
import { useCheckToken } from '../../hooks/useCheckToken'

export const Login = () => {
	const loginUserState = useAppSelector(state => state.userReducer.loginUserState)
	const status = useAppSelector(state => state.authReducer.status)

	const actions = useActionCreatorsTyped({ ...authActions, ...userActions, loginUser })

	const navigate = useNavigate()
	
	useCheckToken()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target

		actions.setLoginUser({ ...loginUserState, [name]: value })
	}

	const handleClick = async () => {
		await actions
			.loginUser({ identifier: loginUserState.identifier, password: loginUserState.password })
			.finally(() => {
				navigate('/products')
			})
	}

	return (
		<Stack gap={2} minHeight={'100vh'} alignItems={'center'} justifyContent='center'>
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
			<BackButton />
		</Stack>
	)
}
