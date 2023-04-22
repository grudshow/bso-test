import { Box, Skeleton } from '@mui/material'

export const ProductsSkeleton = () => {
	return (
		<Box height='100%'>
			<Skeleton variant='rectangular' animation='wave' height={300} />
			<Skeleton variant='text' width={'80%'} height={40} />
			<Skeleton width={'60%'} />
		</Box>
	)
}
