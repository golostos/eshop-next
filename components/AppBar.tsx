import AppBarAuth from '@/features/user/AppBarAuth'
import Link from 'next/link'
import React from 'react'
import { ToggleTheme } from './ToggleTheme'

export default function AppBar() {
  return (
    <header className='flex gap-4 items-center h-16 px-4 shadow-md dark:shadow-slate-300'>
        <nav className='flex-1'>
          <Link href={'/'} className=''>Main page</Link>
        </nav>
        <ToggleTheme />
        <AppBarAuth />
    </header>
  )
}
