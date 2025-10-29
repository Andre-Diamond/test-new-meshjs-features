import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" data-theme="dark">
      <Head>
        <meta name="theme-color" content="#0a0a0a" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}