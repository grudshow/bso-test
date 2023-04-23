import { ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack, Button, TextField, Typography } from '@mui/material'

import { useActionCreatorsTyped, useAppSelector } from '../../hooks/redux'
import { registerUser } from '../../store/reducers/auth/AuthThunks'
import { userActions } from '../../store/reducers/user/UserSlice'

import { BackButton } from '../../components/UI/BackButton'
import { useCheckToken } from '../../hooks/useCheckToken'

export const Registration = () => {
	const actions = useActionCreatorsTyped({ ...userActions, registerUser })

	const registerUserState = useAppSelector(state => state.userReducer.registerUserState)

	const navigate = useNavigate()
	
	useCheckToken()

	const handleSubmit = async () => {
		await actions.registerUser(registerUserState).then(() => {
			actions.setLoginUser({
				identifier: registerUserState.email,
				password: registerUserState.password,
			})
			navigate('/login')
		})
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target

		actions.setRegisterUser({ ...registerUserState, [name]: value })
	}

	return (
		<Stack gap={2} minHeight={'100vh'} alignItems={'center'} justifyContent='center'>
			<Stack gap={2}>
				<Typography variant='h2'>Регистрация</Typography>
				<TextField
					type='text'
					name='username'
					required
					label='Логин'
					value={registerUserState.username}
					onChange={handleChange}
				/>
				<TextField
					type='email'
					name='email'
					required
					label='Почта'
					value={registerUserState.email}
					onChange={handleChange}
				/>
				<TextField
					type='password'
					name='password'
					required
					label='Пароль'
					value={registerUserState.password}
					onChange={handleChange}
				/>
				<Button onClick={handleSubmit} fullWidth size='large' variant='contained'>
					Зарегистрироваться
				</Button>
			</Stack>
			<BackButton />
		</Stack>
	)
}
