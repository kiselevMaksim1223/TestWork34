import type { Metadata } from 'next'
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'A simple weather app using Next.js and OpenWeather API'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={'en'}>
      <body className={`container `}>{children}</body>
    </html>
  )
}
