import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StatusType } from '../../../api/axios.types'
import { AuthResponse, User } from '../../../models/auth.model'
import { loginUser } from './AuthThunks'

interface InitialState {
	user: User | null
	token: string | null
	status: StatusType
}

const initialState: InitialState = {
	user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null,
	token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
	status: 'init',
}

export const authSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		logout: state => {
			state.token = null
			state.user = null
			localStorage.clear()
		},
	},
	extraReducers: {
		[loginUser.fulfilled.type]: (state, action: PayloadAction<AuthResponse>) => {
			state.status = 'success'
			state.user = action.payload.user
			state.token = action.payload.jwt
			localStorage.setItem('token', action.payload.jwt)
			localStorage.setItem('user', JSON.stringify(action.payload.user))
		},
		[loginUser.pending.type]: state => {
			state.status = 'loading'
		},
		[loginUser.rejected.type]: state => {
			state.status = 'error'
			localStorage.clear()
		},
	},
})

export const { reducer: authReducer, actions: authActions } = authSlice
