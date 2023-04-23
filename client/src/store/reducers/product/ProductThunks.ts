import { productApi } from './../../../api/utils/product'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

export const getProducts = createAsyncThunk(
	`product/getProducts`,
	async (_, { rejectWithValue }) => {
		try {
			const response = await productApi.getProducts()
			return response.data.data
		} catch (error: unknown) {
			const err = error as AxiosError
			return rejectWithValue(err.message)
		}
	},
)

export const getProduct = createAsyncThunk(
	`product/getProduct`,
	async (id: number, { rejectWithValue }) => {
		try {
			const response = await productApi.getProduct(id)
			return response.data.data.attributes
		} catch (error: unknown) {
			const err = error as AxiosError
			return rejectWithValue(err.message)
		}
	},
)
