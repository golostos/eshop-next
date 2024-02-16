import AppBarAuth from '@/features/user/AppBarAuth'
import React from 'react'

export default function AppBar() {
  return (
    <header className='flex gap-4 justify-end items-center h-16'>
        <nav></nav>
        <AppBarAuth />
    </header>
  )
}
