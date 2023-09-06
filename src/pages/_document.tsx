import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <script defer src="https://developers.kakao.com/sdk/js/kakao.min.js"></script> */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="initial-scale=1.0, width=devide-width" />
        <link rel='shortcut icon' href='/assets/images/favicon.ico' sizes='any' />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/images/favicon-16x16.png"
        />
        <link rel="manifest" href="/assets/images/site.webmanifest" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
