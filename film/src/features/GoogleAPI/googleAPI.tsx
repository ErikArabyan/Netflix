import { GoogleLogin, CredentialResponse } from '@react-oauth/google'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { setToken } from '../index'
import { socialAuth } from '../userAPI/userSlice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStringContext } from '../../main'
import { AppDispatch } from '../../application/store'

interface GoogleAuthData {
	sub: string
	given_name: string
	picture: string
	email: string
}

export const GoogleButtonAPI = () => {
	const [savedata, setsave] = useState<GoogleAuthData | null>(null)
	const dispatch = AppDispatch()
	const navigate = useNavigate()
	const { backend } = useStringContext()

	const onSuccess = async (credentialResponse: CredentialResponse) => {
		const { credential } = credentialResponse

		if (credential) {
			const gdata = jwtDecode<GoogleAuthData>(credential)
			await axios.post(`${backend}/auth/gtoken_actions/`, credentialResponse)
			document.cookie = `token=${gdata.sub}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`
			setToken()
			setsave(gdata)
		} else {
			console.error('Credential is undefined')
		}
	}

	useEffect(() => {
		if (savedata?.sub) {
			dispatch(socialAuth(savedata))
			navigate('/')
		}
	}, [savedata, dispatch, navigate])

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<GoogleLogin width={220} onSuccess={onSuccess} />
		</div>
	)
}
