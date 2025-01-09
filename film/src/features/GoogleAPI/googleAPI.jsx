import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { setToken } from '../index';
import { socialAuth } from '../userAPI/userSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStringContext } from '../..';


export const GoogleButtonAPI = () => {
	// const clientId = "97173424287-mr88917mp74110bl0so2a4un1gmorq0h.apps.googleusercontent.com";
	const [savedata, setsave] = useState()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { backend } = useStringContext()  

	const onSuccess = async (res) => {
		const gdata = jwtDecode(res.credential)		
		await axios.post(`${backend}/auth/gtoken_actions/`, res);
		document.cookie = `token=${gdata.sub}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`
		setToken(gdata.sub);
		setsave(gdata)
	}

	useEffect(() => {
		if (savedata?.sub) {
			dispatch(socialAuth(savedata))
			navigate('/')
		}
	}, [savedata, dispatch, navigate])
	

	const onFailure = (err) => {
		console.log('failed:', err);
	};

	return (
		<div style={{display: 'flex', justifyContent: 'center'}}>
			<GoogleLogin
				// clientId={clientId}
				width={220}
				onSuccess={onSuccess}
				onFailure={onFailure}
			/>
		</div>
	)
}