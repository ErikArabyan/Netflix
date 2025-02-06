import styles from './style.module.css'
import { useForm } from 'react-hook-form'
import { forgotPasswordChangeAPI } from '../../features/forgotPasswordChangeAPI/forgotPasswordChangeAPI'
import { useNavigate, useParams } from 'react-router'
import { AppDispatch } from '../../application/store'
import { setLoading } from '../../features/loading/loading'

interface FormData {
	password: string
	repassword: string
}

interface Params extends Record<string, string | undefined> {
	uidb64?: string
	token?: string
}

export const ForgotPasswordConfirm = () => {
	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors },
	} = useForm<FormData>()
	const dispatch = AppDispatch()
	const { uidb64, token } = useParams<Params>()
	const navigate = useNavigate()

	const save = (data: FormData) => {
		if (uidb64 && token) {
			dispatch(setLoading(''))
			dispatch(forgotPasswordChangeAPI({ uidb64, token, password: data.password }))
				.unwrap()
				.then(res => {
					if (res?.error) alert(res.error)
					else navigate('/auth/login/')
				})
				.finally(() => dispatch(setLoading('hide')))
		} else {
			alert('Invalid or missing parameters')
		}
		reset()
	}

	return (
		<div className={styles.sp}>
			<div className={styles.spInner}>
				<div className={styles.spDiv}>
					<header>
						<h1 className={styles.heading}>Reset Your Password</h1>
					</header>
					<form className={styles.spForm} onSubmit={handleSubmit(save)}>
						{errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
						{errors.repassword && <p className={styles.errorMessage}>{errors.repassword.message}</p>}

						<label className={styles.spLabel} htmlFor='password'>
							New Password
						</label>
						<input className='blacktext' type='password' {...register('password', { required: 'Password is required' })} />

						<label className={styles.spLabel} htmlFor='repassword'>
							Repeat New Password
						</label>
						<input
							className='blacktext'
							type='password'
							{...register('repassword', {
								required: 'Repeat password is required',
								validate: value => value === getValues('password') || 'Passwords do not match',
								pattern: {
									value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
									message: "Password security check hasn't passed",
								},
							})}
						/>
						<button className='nbutton'>Change</button>
					</form>
				</div>
			</div>
		</div>
	)
}
