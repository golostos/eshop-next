'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ShoppingBasket } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'

export default function AppBarAuth() {
  const session = useSession()
  const router = useRouter()
  if (session.status === 'loading') {
    return <div className='flex gap-4'>
      <Skeleton className='h-10 w-10' />
      <Skeleton className='h-10 w-10 rounded-full' />
    </div>
  }
  if (session.data?.user) {
    return (
      <div className='flex gap-4'>
        <Button size={'icon'} onClick={() => {
          router.push('/cart')
        }}><ShoppingBasket /></Button>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={session.data.user.image ?? undefined} alt={session.data.user.name ?? undefined} />
              <AvatarFallback>{
                session.data.user.email
                  ? session.data.user.email.slice(0, 2).toUpperCase()
                  : 'GO'
              }</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={'/profile'}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={'/cart'}>Cart</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={'/orders'}>Orders</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={
              () => router.push('/favorites')
            }>
              Favorites
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    )
  }
  return (
    <div className='flex gap-4'>
      <Button onClick={() => signIn()}>Login</Button>
      <Button onClick={() => signIn()}>Signup</Button>
    </div>
  )
}
