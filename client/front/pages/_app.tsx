import '../styles/globals.css'
import type { AppProps } from 'next/app'
import MyApolloprovider from '../graphql/apollo'

function MyApp({ Component, pageProps }: AppProps) {
  return <MyApolloprovider><Component {...pageProps}/></MyApolloprovider>
}

export default MyApp
