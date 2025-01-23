import { ReactNode, useEffect } from 'react'
import { createBrowserRouter, useNavigate } from 'react-router-dom'
import { Layout } from './pages/Layout'
import { Home } from './pages/Home'
import { QRLoading } from './pages/QRLoading'
import { Login } from './pages/Login'
import { FilmDetails } from './pages/FilmDetails'
import { LoginByQR } from './pages/LoginByQr'
import { RegisterLayout } from './pages/RegisterLayout'
import { Error } from './pages/Error'
import { Register } from './pages/Register'
import { RegisterVerify } from './pages/RegisterVerify'
import { ForgotPasswordConfirm } from './pages/ForgotPasswordConfirm'
import { ForgotPassword } from './pages/ForgotPassword'
import { EmailSend } from './pages/EmailSend'
import { AppSelector, RootState } from './application/store'


interface NoAuthProps {
	children: ReactNode
}

const NoAuth = ({ children }: NoAuthProps) => {
	const user = AppSelector(state => state?.userAPI)
	const navigate = useNavigate()
	useEffect(() => {
		if (user?.username) {
			navigate(-1)
		}
	}, [])

	return user?.username ? <Home /> : <>{children}</>
}

interface AuthProps {
	children: ReactNode
}

const Auth = ({ children }: AuthProps) => {
	const user = AppSelector((state: RootState) => state.userAPI)
	return user?.username ? <>{children}</> : <Home />
}

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '',
				element: <Home />,
			},
			{
				path: 'load/:SessionId/',
				element: <QRLoading />,
			},
			{
				path: 'auth/login',
				element: (
					<NoAuth>
						<Login />
					</NoAuth>
				),
			},
			{
				path: 'film/:id/:filmname/',
				element: (
					<Auth>
						<FilmDetails />
					</Auth>
				),
			},
			{
				path: 'auth/login-by-qr',
				element: (
						<LoginByQR />
				),
			},
			{
				path: '*',
				element: <Error />,
			},
		],
	},
	{
		path: '/',
		element: <RegisterLayout />,
		children: [
			{
				path: 'auth/register',
				element: (
					<NoAuth>
						<Register />
					</NoAuth>
				),
			},
			{
				path: 'auth/register/verification-code/',
				element: (
					<NoAuth>
						<RegisterVerify />
					</NoAuth>
				),
			},
			{
				path: 'auth/forgot-password',
				element: (
					<NoAuth>
						<ForgotPassword />
					</NoAuth>
				),
			},
			{
				path: 'auth/reset/:uidb64/:token/',
				element: (
					<NoAuth>
						<ForgotPasswordConfirm />
					</NoAuth>
				),
			},
			{
				path: 'auth/email_send/',
				element: (
					<NoAuth>
						<EmailSend />
					</NoAuth>
				),
			},
		],
	},
])