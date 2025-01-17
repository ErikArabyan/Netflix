import { useRef, useState, useCallback } from 'react'
import styles from './style.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { registerCodeVerifyAPI } from '../../features/registerCodeVerification/registerCodeVerificationAPI'
import { AppDispatch } from '../../application/store'
import { setLoading } from '../../features/loading/loading'

export const RegisterVerify = () => {
	const inputsRef = useRef<(HTMLInputElement | null)[]>([])
	const location = useLocation()
	const data = location.state
	const dispatch = AppDispatch()
	const [codeError, setCodeError] = useState<string | string[]>([])
	const navigate = useNavigate()

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const { value } = e.target as HTMLInputElement
		if (value && index < inputsRef.current.length - 1) {
			inputsRef.current[index + 1]?.focus()
		}
	}, [])

	const handleKey = useCallback((e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
		if (e.key === 'Backspace' && !(e.target as HTMLInputElement).value && index > 0) {
			inputsRef.current[index - 1]?.focus()
		}
	}, [])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const code = inputsRef.current.map(input => input?.value).join('')
		const send = { code: code, email: data }
		if (data) {
			dispatch(setLoading(''))
			dispatch(registerCodeVerifyAPI(send))
				.unwrap()
				.then(res => {
					if (res.error) {
						setCodeError(res.error)
					} else {
						navigate('/auth/login')
					}
				})
				.catch(() => setCodeError('An error occurred. Please try again.'))
				.finally(() => dispatch(setLoading('hide')))
		}
	}

	return (
		<div className={styles.verificationContainer}>
			<form id={styles.verificationForm} onSubmit={handleSubmit}>
				<div>
					<h1 className='blacktext'>Let's confirm your account.</h1>
					<p className='blacktext'>You have received a verification code to your email, please confirm it to start watching.</p>
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
							aria-label={`Verification code input ${index + 1}`}
						/>
					))}
				</div>

				<button className='nbutton' type='submit'>
					Confirm
				</button>
			</form>
		</div>
	)
}
