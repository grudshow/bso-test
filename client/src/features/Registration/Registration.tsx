import { Box, Button, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../api/axios'
import { useActionCreatorsTyped, useAppSelector } from '../../hooks/redux'
import { registerUser } from '../../store/reducers/auth/AuthThunks'
import { userActions } from '../../store/reducers/user/UserSlice'

export const Registration = () => {
	const actions = useActionCreatorsTyped({ ...userActions, registerUser })

	const registerUserState = useAppSelector(state => state.userReducer.registerUserState)

	const navigate = useNavigate()

	const handleSubmit = async () => {
		await actions.registerUser(registerUserState).then(res => {
			actions.setLoginUser({
				identifier: registerUserState.email,
				password: registerUserState.password,
			})
			console.log(res)
			navigate('/login')
		})
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target

		actions.setRegisterUser({ ...registerUserState, [name]: value })
	}

	return (
		<Stack minHeight={'100vh'} alignItems={'center'} justifyContent='center'>
			<Stack gap={2}>
				<Typography variant='h2'>Регистрация</Typography>
				<TextField
					type='text'
					name='username'
					label='Логин'
					value={registerUserState.username}
					onChange={handleChange}
				/>
				<TextField
					type='email'
					name='email'
					label='Почта'
					value={registerUserState.email}
					onChange={handleChange}
				/>
				<TextField
					type='password'
					name='password'
					label='Пароль'
					value={registerUserState.password}
					onChange={handleChange}
				/>
				<Button onClick={handleSubmit} fullWidth size='large' variant='contained'>
					Зарегистрироваться
				</Button>
			</Stack>
		</Stack>
	)
}
