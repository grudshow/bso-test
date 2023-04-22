import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { Header } from './Header/Header'

export const Layout = () => {
	return (
		<>
			<Header />
			<Container sx={{ marginY: 4 }} maxWidth='xl'>
				<Outlet />
			</Container>
		</>
	)
}
