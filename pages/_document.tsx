import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="The premiere coffee delivery service." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-slate-100 dark:bg-gray-800">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
