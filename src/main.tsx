import { ViteReactSSG } from 'vite-react-ssg/single-page'
import App from './App.tsx'
import './styles/global.scss'

export const createRoot = ViteReactSSG(<App />)
