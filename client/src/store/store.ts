import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authReducer } from './reducers/auth/AuthSlice'
import { productReducer } from './reducers/product/ProductSlice'
import { userReducer } from './reducers/user/UserSlice'

const rootReducer = combineReducers({ authReducer, userReducer, productReducer })

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware => getDefaultMiddleware(),
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
