import { User } from "./user.model"

export interface AuthRequest {
	identifier: string
	password: string
}


export interface AuthResponse {
	jwt: string
	user: User
}
