'use client';

import React, { PropsWithChildren } from 'react'
import { ThemeProvider } from './theme-provider'
import { SessionProvider } from 'next-auth/react'

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        {children}
      </SessionProvider>
    </ThemeProvider>
  )
}
