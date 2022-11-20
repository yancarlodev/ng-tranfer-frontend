import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import SessionProvider from '../contexts/SessionContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }: AppProps) {
  return(
    <SessionProvider>
        <Component {...pageProps} />
        <ToastContainer />
    </SessionProvider>
  )
}
