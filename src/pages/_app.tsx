import { Toaster } from 'react-hot-toast'
import { createTheme, NextUIProvider } from '@nextui-org/react'

import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import { AppProps } from 'next/app'
import '../../public/main.css'
import dynamic from 'next/dynamic';
const AuthLayout = dynamic(() => import('@/components/AuthLayout'), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  // Step 1 - Initialize wallets and wallet connect client
  const initialized=true
  return (
    <NextUIProvider theme={createTheme({ type: 'light' })}>
      <Layout initialized={initialized}>
        <Toaster />
        <AuthLayout>
        <Component {...pageProps} />
        </AuthLayout>
      </Layout>
      <Modal />
    </NextUIProvider>
  )
}
