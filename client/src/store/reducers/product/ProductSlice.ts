import { ProductAttributes, ProductResponse } from './../../../models/product.model'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StatusType } from '../../../api/axios.types'
import { getProduct, getProducts } from './ProductThunks'

interface InitialState {
	products: ProductResponse[] | null
	status: StatusType
	cart: ProductAttributes[]
	product: ProductAttributes | null 
}

const initialState: InitialState = {
	products: null,
	product: null,
	status: 'init',
	cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || '') : [],
}

export const productSlice = createSlice({
	name: 'productSlice',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<ProductAttributes>) => {
			state.cart.push(action.payload)
			localStorage.setItem('cart', JSON.stringify(state.cart))
		},
		deleteToCart: (state, action: PayloadAction<string>) => {
			state.cart = state.cart.filter(item => item.Slug !== action.payload)
			localStorage.setItem('cart', JSON.stringify(state.cart))
		},
	},
	extraReducers: {
		[getProducts.fulfilled.type]: (state, action: PayloadAction<ProductResponse[]>) => {
			state.status = 'success'
			state.products = action.payload
		},
		[getProducts.pending.type]: state => {
			state.status = 'loading'
		},
		[getProducts.rejected.type]: state => {
			state.status = 'error'
		},
		[getProduct.fulfilled.type]: (state, action: PayloadAction<ProductAttributes>) => {
			state.status = 'success'
			state.product = action.payload
		},
		[getProduct.pending.type]: state => {
			state.status = 'loading'
		},
		[getProduct.rejected.type]: state => {
			state.status = 'error'
		},
	},
})

export const { reducer: productReducer, actions: productActions } = productSlice
