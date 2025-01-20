import { router } from './routes'
import { createContext, useContext } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { RouterProvider } from 'react-router-dom'
import { store } from './application/store'
import { App } from './App'
import "./index.css"

interface StringContextType {
	backend: string
	ipPort: string
}

const StringContext = createContext<StringContextType>({ backend: '', ipPort: '' })

export const useStringContext = (): StringContextType => {
	const context = useContext(StringContext)
	if (!context) {
		throw new Error('useStringContext must be used within a StringContext.Provider')
	}
	return context
}

const protocol = (import.meta as any).env.VITE_PROTOCOL
const ip = (import.meta as any).env.VITE_IP
const clientID = (import.meta as any).env.VITE_GOOGLE_CLIENT_ID
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
		<GoogleOAuthProvider clientId={clientID}>
			<Provider store={store}>
				<StringContext.Provider value={{ backend: `${protocol}${ip}`, ipPort: ip }}>
					<App />
					<RouterProvider router={router} />
				</StringContext.Provider>
			</Provider>
		</GoogleOAuthProvider>
)
