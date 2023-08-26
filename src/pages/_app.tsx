import Layout from '@/components/Layout'
import { Providers } from '@/redux/provider'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Script strategy='afterInteractive' src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GTAG_ID}`} />
      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.GTAG_ID}');`
        }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  )

}
