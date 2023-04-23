import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from './redux'

export const useCheckToken = () => {
	const token = useAppSelector(state => state.authReducer.token)
	const user = useAppSelector(state => state.authReducer.user)

	const navigate = useNavigate()

	useEffect(() => {
		if (token && user) {
			navigate('/products')
		}
	}, [])
}
