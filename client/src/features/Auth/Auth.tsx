import { useNavigate } from 'react-router-dom'
import { Button, Stack, Typography } from '@mui/material'

export const Auth = () => {
	const navigate = useNavigate()

	return (
		<Stack minHeight={'100vh'} alignItems={'center'} justifyContent='center'>
			<Stack gap={2}>
				<Typography variant='h2'>Авторизация</Typography>
				<Stack direction={'row'} gap={2} justifyContent={'space-between'}>
					<Button fullWidth size='large' variant='contained' onClick={() => navigate('/login')}>
						Вход
					</Button>
					<Button fullWidth size='large' variant='contained' onClick={() => navigate('/register')}>
						Регистрация
					</Button>
				</Stack>
			</Stack>
		</Stack>
	)
}
