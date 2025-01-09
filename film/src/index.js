import React, { createContext, useContext } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { urlPatterns } from './components/urls'
import { App } from './App'
import { GoogleOAuthProvider } from '@react-oauth/google'

const StringContext = createContext()
const container = document.getElementById('root')
const root = createRoot(container)
root.render(
	<GoogleOAuthProvider clientId='97173424287-mr88917mp74110bl0so2a4un1gmorq0h.apps.googleusercontent.com'>
		<Provider store={store}>
			<StringContext.Provider value={{ backend: 'https://192.168.1.213:8000', ipPort: '192.168.1.213:8000' }}>
				<App />
				<RouterProvider router={urlPatterns} />
			</StringContext.Provider>
		</Provider>
	</GoogleOAuthProvider>
)

export const useStringContext = () => useContext(StringContext)