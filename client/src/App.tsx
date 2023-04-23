import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { useAppSelector } from './hooks/redux'
import { AuthPage } from './pages/AuthPage'
import { LoginPage } from './pages/LoginPage'
import { ProductPage } from './pages/ProductPage'
import { ProductsPage } from './pages/ProductsPage'
import { RegistrationPage } from './pages/RegistrationPage'
import { PrivateRouter } from './router/PrivateRouter'

export const App = () => {
	const token = useAppSelector(state => state.authReducer.token)
	const user = useAppSelector(state => state.authReducer.user)
	const navigate = useNavigate()

	// useEffect(() => {
	// 	if (token && user) {
	// 		navigate('/products')
	// 	}
	// }, [])

	return (
		<Routes>
			<Route path='/' element={<AuthPage />} />
			<Route path='/login' element={<LoginPage />} />
			<Route path='/register' element={<RegistrationPage />} />
			<Route element={<PrivateRouter />}>
				<Route element={<Layout />}>
					<Route path='/products' element={<ProductsPage />} />
					<Route path='/products/:id' element={<ProductPage />} />
				</Route>
			</Route>
		</Routes>
	)
}
