import { useRef, useState } from 'react'
import styles from './style.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { registerCodeVerifyAPI } from '../../features/registerCodeVerification/registerCodeVerificationAPI'
import { AppDispatch } from '../../application/store'

export const RegisterVerify = () => {
	const inputsRef = useRef<(HTMLInputElement | null)[]>([])
	const location = useLocation()
	const data = location.state
	const dispatch = AppDispatch()
	const [codeError, setCodeError] = useState('')
	const navigate = useNavigate()
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const { value } = e.target as HTMLInputElement
		if (value && index < inputsRef.current.length - 1) {
			inputsRef.current[index + 1]?.focus()
		}
	}
	const handleKey = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
		if (e.key === 'Backspace' && !(e.target as HTMLInputElement).value && index > 0) {
			inputsRef.current[index - 1]?.focus()
		}
		if (e.code.substring(0, 5) === 'Digit' && inputsRef.current[index]?.value) {
			e.preventDefault()
			inputsRef.current[index].value = e.key
			inputsRef.current[index + 1]?.focus()
		}
	}
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const code = inputsRef.current.map(input => input?.value).join('')
		const send = { code: code, email: data }
		if (data) {
			dispatch(registerCodeVerifyAPI(send))
				.unwrap()
				.then(res => {
					res.error ? setCodeError(res.error) : navigate('/auth/login')
				})
		}
	}
	return (
		<div className={styles.verificationContainer}>
			<form id={styles.verificationForm} onSubmit={handleSubmit}>
				<div>
					<h1 className='blacktext'>Let's confirm your account.</h1>
					<p className='blacktext'>You have received verification code to your email, please confirm it to start watching.</p>
					{codeError &&
						Object.values(codeError).map((error, index) => (
							<small className={styles.errorMessage} key={index}>
								{error}
							</small>
						))}
				</div>
				<div className={styles.codeInputs}>
					{Array.from({ length: 4 }).map((_, index) => (
						<input
							key={index}
							type='number'
							min={0}
							max={9}
							required
							className={[styles.codeInput, codeError ? styles.codeError : ''].join(' ')}
							ref={el => {
								inputsRef.current[index] = el
							}}
							onChange={e => handleInputChange(e, index)}
							onKeyDown={e => handleKey(e, index)}
						/>
					))}
				</div>
				<button className='nbutton'>Confirm</button>
			</form>
		</div>
	)
}
