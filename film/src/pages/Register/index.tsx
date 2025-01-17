import { useForm } from 'react-hook-form'
import styles from './style.module.css'
import { registerAPI } from '../../features/registerAPI/registerAPI'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { setLoading } from '../../features/loading/loading'
import { AppDispatch } from '../../application/store'

interface FormData {
	first_name: string
	last_name: string
	email: string
	password: string
}

export const Register = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>()
	const dispatch = AppDispatch()
	const navigate = useNavigate()
	const [codeError, setCodeError] = useState<string | string[]>('')

	const save = (data: FormData) => {
		dispatch(setLoading(''))
		dispatch(registerAPI(data))
			.unwrap()
			.then(res => {
				if (res.error) {
					setCodeError(res.error)
				} else {
					navigate('/auth/register/verification-code/', { state: data.email })
				}
			})
			.finally(() => {
				dispatch(setLoading('hide'))
			})

		reset()
	}

	return (
		<div className={styles.registrationMain}>
			<div className={styles.registrationInner}>
				<h1 className='blacktext'>Create a password to start your membership</h1>
				<p className='blacktext'>Just a few more steps and you're done! We hate paperwork, too.</p>
				<form autoComplete='on' className={styles.register} onSubmit={handleSubmit(save)}>
					{errors.first_name && <small className={styles.errorMessage}>{errors.first_name.message}</small>}
					{errors.last_name && <small className={styles.errorMessage}>{errors.last_name.message}</small>}
					{errors.email && <small className={styles.errorMessage}>{errors.email.message}</small>}
					{errors.password && <small className={styles.errorMessage}>{errors.password.message}</small>}
					{codeError &&
						(Array.isArray(codeError) ? (
							codeError.map((error, index) => (
								<small className={styles.errorMessage} key={index}>
									{error}
								</small>
							))
						) : (
							<small className={styles.errorMessage}>{codeError}</small>
						))}

					<input
						type='text'
						autoComplete='given-name'
						id='first_name'
						className={[styles.registrationInputs, errors.first_name ? styles.errorInput : ''].join(' ')}
						{...register('first_name', {
							required: 'Please enter your first name',
						})}
					/>
					<label htmlFor='first_name'>First name</label>

					<input
						type='text'
						autoComplete='family-name'
						id='last_name'
						className={[styles.registrationInputs, errors.last_name ? styles.errorInput : ''].join(' ')}
						{...register('last_name', {
							required: 'Please enter your last name',
						})}
					/>
					<label htmlFor='last_name'>Last name</label>

					<input
						type='email'
						id='email'
						autoComplete='email'
						className={[styles.registrationInputs, errors.email ? styles.errorInput : ''].join(' ')}
						{...register('email', {
							required: 'Please enter your email',
						})}
					/>
					<label htmlFor='email'>Email</label>

					<input
						type='password'
						id='password'
						autoComplete='password'
						className={[styles.registrationInputs, errors.password ? styles.errorInput : ''].join(' ')}
						{...register('password', {
							required: 'Please enter your password',
							pattern: {
								value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
								message: "Password security check hasn't passed",
							},
						})}
					/>
					<label htmlFor='password'>Password</label>

					<button type='submit' className='nbutton'>
						Register
					</button>
				</form>
			</div>
		</div>
	)
}
