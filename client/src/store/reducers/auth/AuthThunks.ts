import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { authApi } from '../../../api/utils/auth'
import { AuthRequest } from '../../../models/auth.model'
import { UserRequest } from '../../../models/user.model'

export const loginUser = createAsyncThunk(
	`user/loginUser`,
	async (params: AuthRequest, { rejectWithValue }) => {
		try {
			const response = await authApi.login(params)
			return response.data
		} catch (error: unknown) {
			const err = error as AxiosError
			return rejectWithValue(err.message)
		}
	},
)

export const registerUser = createAsyncThunk(
	`user/registerUser`,
	async (params: UserRequest, { rejectWithValue }) => {
		try {
			const response = await authApi.register(params)
			return response.data
		} catch (error: unknown) {
			const err = error as AxiosError
			return rejectWithValue(err.message)
		}
	},
)
