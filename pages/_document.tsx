import { Html, Head, Main, NextScript } from 'next/document'

function Document() {
  return (
    <Html lang='zh-Hant'>
      <Head />
      <body className='overflow-x-hidden bg-[#15202b] text-white antialiased selection:bg-[#67769660]'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
