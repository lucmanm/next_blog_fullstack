import './globals.css'

export const metadata = {
  title: 'Full Stack Blog',
  description: 'Fullstack Crud BLOG',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
