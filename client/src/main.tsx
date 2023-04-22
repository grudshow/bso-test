import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'

import { App } from './App'
import { theme } from './theme'
import { setupStore } from './store/store'
import { BrowserRouter } from 'react-router-dom'

const store = setupStore()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<CssBaseline />
				<App />
			</Provider>
		</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>,
)
