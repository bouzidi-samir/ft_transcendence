import '../styles/globals.css'
import type { AppProps } from 'next/app'
import MyApolloprovider from '../graphql/apollo'
// import Guard from '../components/guard'

function MyApp({ Component, pageProps }: AppProps) {
  return <MyApolloprovider>
    {/* <Guard> */}
    <Component {...pageProps}/>
    {/* </Guard> */}
    </MyApolloprovider>
}

export default MyApp
