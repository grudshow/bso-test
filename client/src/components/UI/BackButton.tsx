import { FC } from 'react'
import { To, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

interface Props {
	toNavigate?: To
	title?: string
}

export const BackButton: FC<Props> = props => {
	const { toNavigate, title } = props

	const navigate = useNavigate()
	return (
		<Button startIcon={<KeyboardBackspaceIcon />} onClick={() => navigate(toNavigate || '/')}>
			{`Вернуться ${title ? 'к ' + title : ''}`}
		</Button>
	)
}
