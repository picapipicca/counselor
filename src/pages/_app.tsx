import Layout from '@/components/Layout'
import Script from 'next/script'
import type { AppProps } from 'next/app'
import { Providers } from '@/redux/provider'
import { DefaultSeo } from 'next-seo'
import SEO from '../../seo.config'
import '@/styles/globals.css'

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <DefaultSeo {...SEO} />
      <Script strategy='afterInteractive' src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTAG_ID}`} />
      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GTAG_ID}');`
        }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  )

}
