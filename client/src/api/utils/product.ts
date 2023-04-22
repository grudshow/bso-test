import { ProductResponse } from './../../models/product.model'
import { apiAuth } from './../axios'
import { AxiosResponseModel, ResponseDataModel } from '../axios.types'

export const productApi = {
	getProducts(): AxiosResponseModel<ResponseDataModel<ProductResponse[]>> {
		return apiAuth.get('/api/products?populate=*')
	},
}
