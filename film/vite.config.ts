import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import paths from 'vite-tsconfig-paths'
import fs from 'fs'


export default defineConfig({
	root: '.',
	base: '',
	publicDir: './public',
	build: {
		emptyOutDir: true,
		outDir: './public',
	},
	server: {
		https: {
			key: fs.readFileSync('./cert/localhost+2-key.pem'),
			cert: fs.readFileSync('./cert/localhost+2.pem'),
		},
		host: '0.0.0.0',
		port: 3000,
	},
	plugins: [paths({ root: '.' }), react()],
})
