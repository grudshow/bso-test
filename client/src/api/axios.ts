import axios from 'axios'

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_KEY,
})

export const apiAuth = axios.create({
	baseURL: import.meta.env.VITE_API_KEY,
	headers: {
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	},
})
