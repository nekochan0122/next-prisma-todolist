import { Html, Head, Main, NextScript } from 'next/document'

function Document() {
  return (
    <Html lang='zh-Hant'>
      <Head>
        <title>Todo List</title>

        {/* Google Fonts */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Fira+Code&family=Noto+Sans+TC&family=Noto+Sans+SC&display=swap'
        />

        {/* Custom Fonts */}
        <link
          rel='preload'
          crossOrigin='anonymous'
          href='/fonts/CattieRegular-EaBG8.woff2'
          as='font'
          type='font/woff2'
        />
      </Head>
      <body className='h-screen overflow-hidden bg-gradient-to-br from-[#00b7ff9b] to-[#f43f5d98] p-10 font-content antialiased selection:bg-[#67769660]'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
