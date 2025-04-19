import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LogiSeq',
  description: 'Aplicação para identificação de padrões em sequências numéricas',
  icons: {
    icon: '/icon.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}