'use client';
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Cart } from '@prisma/client';

export default function CartPage() {
  const { data: cart, isLoading } = useQuery<{data: Cart[]}>({
    queryKey: ['cart'],
    queryFn: () => {
      return fetch('/api/cart').then(res => res.json())
    }
  })
  if (isLoading) return <div>Loading...</div>
  if (!cart) return <div>Load error</div>
  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {
          cart.data.map((cartItem) => {
            return <li key={cartItem.id}>{cartItem.id}</li>
          })
        }
      </ul>
    </div>
  )
}
