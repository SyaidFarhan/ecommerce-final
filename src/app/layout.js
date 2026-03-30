import './globals.css'
import ClientProviders from '@/components/ClientProviders'

export const metadata = {
  title: 'Elysian Store',
  description: 'E-commerce platform for students',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
