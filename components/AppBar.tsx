import AppBarAuth from '@/features/user/AppBarAuth'
import Link from 'next/link'
import React from 'react'
import { ToggleTheme } from './ToggleTheme'
import { Smartphone } from 'lucide-react'

export default function AppBar() {
  return (
    <header className='flex gap-4 items-center h-16 px-4 shadow-md dark:shadow-zinc-800'>
        <nav className='flex-1 flex gap-2 items-center'>
          <Smartphone />
          <Link href={'/'} className=''>Main page</Link>
        </nav>
        <ToggleTheme />
        <AppBarAuth />
    </header>
  )
}
