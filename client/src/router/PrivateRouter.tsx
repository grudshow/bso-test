import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'

export const PrivateRouter = () => {
	const token = useAppSelector(state => state.authReducer.token)
	const user = useAppSelector(state => state.authReducer.user)
	return token && user ? <Outlet /> : <Navigate to={'/login'} />
}
