import Link from "next/link";

export default function RootIndex() {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content="0; url=/en/" />
        <link rel="canonical" href="https://shakha.uz/en/" />
      </head>
      <body>
        <p>
          Redirecting to <Link href="/en/">English site</Link>…
        </p>
        <script
          dangerouslySetInnerHTML={{ __html: `location.replace('/en/');` }}
        />
      </body>
    </html>
  );
}
