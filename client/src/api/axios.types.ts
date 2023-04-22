import { AxiosResponse } from 'axios'

export type StatusType = 'init' | 'loading' | 'error' | 'success'

interface Pagination {	
	page: number
	pageCount: number
	pageSize: number
	total: number
}

export interface ResponseDataModel<T> {
	data: T
	meta: {
		pagination: Pagination
	}
}


export type AxiosResponseModel<T> = Promise<AxiosResponse<T>>
