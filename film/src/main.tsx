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
const protocol = "http://"
const ip = "192.168.1.213:8000"
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
		<GoogleOAuthProvider clientId='97173424287-mr88917mp74110bl0so2a4un1gmorq0h.apps.googleusercontent.com'>
			<Provider store={store}>
				<StringContext.Provider value={{ backend: `${protocol}${ip}`, ipPort: ip }}>
					<App />
					<RouterProvider router={router} />
				</StringContext.Provider>
			</Provider>
		</GoogleOAuthProvider>
)
