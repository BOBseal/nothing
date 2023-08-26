import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Header, InputForm } from '@/components'
import { BadgerProvider } from "../Context"

export const metadata: Metadata = {
  title: 'Badger Scanner',
  description: 'this is badger scanner official website',
  keywords: ["badgerscan", "badger"]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body>
             <BadgerProvider>
                <Header/>
                <main className=''>
                  {children}
                </main>
             </BadgerProvider>
        </body>
    </html>
  )
}
