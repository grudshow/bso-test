export interface UserRequest {
	username: string
	email: string
	password: string
}

export interface User {
	id: number
	username: string
	email: string
	provider: string
	confirmed: boolean
	blocked: boolean
	createdAt: Date
	updatedAt: Date
}
