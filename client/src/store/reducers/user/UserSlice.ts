import { StatusType } from '../../../api/axios.types'
import { registerUser } from '../auth/AuthThunks'
import { AuthRequest } from '../../../models/auth.model'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserRequest } from '../../../models/user.model'

interface InitialState {
	loginUserState: AuthRequest
	registerUserState: UserRequest
	status: StatusType
}

const initialState: InitialState = {
	loginUserState: { identifier: '', password: '' },
	registerUserState: {
		username: '',
		email: '',
		password: '',
	},
	status: 'init',
}

export const userSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		setLoginUser: (state, action: PayloadAction<AuthRequest>) => {
			state.loginUserState = action.payload
		},
		setRegisterUser: (state, action: PayloadAction<UserRequest>) => {
			state.registerUserState = action.payload
		},
	},
	extraReducers: {
		[registerUser.fulfilled.type]: (state, action: PayloadAction<UserRequest>) => {
			state.status = 'success'
		},
		[registerUser.pending.type]: state => {
			state.status = 'loading'
		},
		[registerUser.rejected.type]: state => {
			state.status = 'error'
		},
	},
})

export const { reducer: userReducer, actions: userActions } = userSlice
