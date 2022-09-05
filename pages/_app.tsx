import { SessionProvider } from 'next-auth/react'
import { ContextProvider } from '@/context'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </SessionProvider>
  )
}

export default MyApp
