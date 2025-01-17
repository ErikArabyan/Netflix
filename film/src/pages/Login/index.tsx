import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import styles from './style.module.css'
import { loginAPI } from '../../features/loginAPI/loginAPI'
import { setLoading } from '../../features/loading/loading'
import { useState } from 'react'
import { GoogleButtonAPI } from '../../features/GoogleAPI/googleAPI'
import { AppDispatch } from '../../application/store'

interface data {
	email: string
	password: string
}

export const Login = () => {
	const navigate = useNavigate()
	const dispatch = AppDispatch()
	const [caught, setCaught] = useState<string>('')
	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm<data>()

	const save = (data: data) => {
		dispatch(setLoading(''))
		dispatch(loginAPI(data))
			.unwrap()
			.then(() => {
				navigate('/')
			})
			.catch(() => {
				setCaught('Login or password are incorrect')
			})
			.finally(() => {
				dispatch(setLoading('hide'))
			})

		reset()
	}

	return (
		<div className={styles.login}>
			<div className={styles.inner}>
				<form className={styles.form} onSubmit={handleSubmit(save)}>
					<section className={styles.innerform}>
						<header>
							<h1>Sign In</h1>
						</header>
						{caught ? <h3 className={styles.caught}>{caught}</h3> : <></>}
						<input
							type='email'
							id='email'
							className={[styles.loginInput, errors.email ? styles.invalid : ''].join(' ')}
							placeholder=''
							{...register('email', {
								required: 'please enter your email',
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: 'Invalid email address',
								},
							})}
						/>
						<label className={styles.loginLabel} htmlFor='email'>
							Email
						</label>
						<input
							className={[styles.loginInput, errors.email ? styles.invalid : ''].join(' ')}
							type='password'
							placeholder=''
							{...register('password', {
								required: 'please enter your password',
							})}
						/>
						<label className={styles.loginLabel} htmlFor='email'>
							Password
						</label>
						<button className='nbutton'>Login</button>
						<Link to={'/auth/forgot-password/'}>Forgot password?</Link>
						<p>
							New to Netflix? <Link to={'/auth/register/'}>Sign up now</Link>.
						</p>
						<GoogleButtonAPI />
						<Link to={'/auth/login-by-qr/'} className={styles.qrlink}>
							<span>
								<img src='/qr-code.png' className={styles.qrimg} alt='' />
							</span>{' '}
							<span className={styles.qrText}>Sign in by QR</span>
						</Link>
					</section>
				</form>
			</div>
		</div>
	)
}
