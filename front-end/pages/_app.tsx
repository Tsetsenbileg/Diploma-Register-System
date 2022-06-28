import '../styles/globals.css'
import 'antd/dist/antd.css'
import "../styles/constant.css"
import type { AppProps } from 'next/app'
import { UserProvider } from '../Context/user'
import Layout from '../Layout'
function MyApp({ Component, pageProps }: AppProps) {
  return <UserProvider><Layout><Component {...pageProps} /></Layout></UserProvider>
}

export default MyApp
