export interface ProductAttributes {
	Image: {
		data: {
			attributes: {
				url: string
			}
		}
	}
	Price: number
	Slug: string
	Title: number
	createdAt: Date
	publishedAt: Date
	updatedAt: Date
}

export interface ProductResponse {
	id: number
	attributes: ProductAttributes
}
