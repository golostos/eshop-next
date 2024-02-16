'use client'

import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import React from 'react'

export default function AppBarAuth() {
  return (
    <div className='flex gap-4'>
        <Button onClick={() => signIn()}>Login</Button>
        <Button onClick={() => signIn()}>Signup</Button>
    </div>
  )
}
