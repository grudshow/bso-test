import { api } from './../axios'
import { AuthRequest, AuthResponse } from '../../models/auth.model'
import { AxiosResponseModel } from '../axios.types'
import { UserRequest } from '../../models/user.model'

export const authApi = {
	login(params: AuthRequest): AxiosResponseModel<AuthResponse> {
		return api.post('/api/auth/local', params)
	},

	register(params: UserRequest): AxiosResponseModel<AuthResponse> {
		return api.post('/api/auth/local/register', params)
	},
}
