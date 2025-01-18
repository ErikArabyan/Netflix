import styles from './style.module.css'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { forgotPasswordAPI } from '../../features/forgotPasswordAPI/forgotPasswordAPI'
import { setLoading } from '../../features/loading/loading'
import { AppDispatch } from '../../application/store'

interface ForgotPassword {
    email: string;
}

export const ForgotPassword = () => {
	const dispatch = AppDispatch()
	const navigate = useNavigate()
	const { register, reset, handleSubmit } = useForm<ForgotPassword>()


	const save = (data: ForgotPassword) => {
		dispatch(setLoading(''))
		dispatch(forgotPasswordAPI(data))
			.unwrap()
			.then(res => {
				if (res?.error) {
					dispatch(setLoading('hide'))
					alert(res.error)
				} else {
					dispatch(setLoading('hide'))
					navigate('/auth/email_send/')
				}
			})
		reset()
	}

	return (
		<div className={styles.fp}>
			<div className={styles.fpInner}>
				<div className={styles.fpDiv}>
					<h1 className={styles.blackText}>Update password, email or phone</h1>
					<p className={styles.blackText}>How would you like to reset your password?</p>
					<div className={styles.radio}>
						<label className={styles.rpInp} htmlFor='html'>
							<input type='radio' name='email-sms' value='email' defaultChecked />
							<p className={styles.blackText}>Email</p>
						</label>
						<label htmlFor='css' className={styles.rpInp}>
							<input type='radio' id='css' name='email-sms' value='SMS' />
							<p className={styles.blackText}>SMS</p>
						</label>
					</div>
					<p className={styles.blackText}>We will send you an email with instructions on how to reset your password.</p>
					<form className={styles.fpForm} onSubmit={handleSubmit(save)}>
						<input
							className={styles.fpInput}
							type='email'
							placeholder='name@example.com'
							{...register('email', {
								required: 'Please enter your Email',
							})}
						/>
						<button className='nbutton'>Email Me</button>
					</form>
					{/* <Link className={styles.blackText}>I don't remember my email or phone.</Link> */}
				</div>
			</div>
		</div>
	)
}
