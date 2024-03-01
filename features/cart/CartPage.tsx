'use client';
import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Cart, cartSchema } from './cart-schema';
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { data: cart, isLoading, isError } = useQuery<Cart | undefined>({
    queryKey: ['cart'],
    queryFn: () => {
      return fetch('/api/cart').then(res => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      }).then(data => {
        return cartSchema.parse(data)
      }).catch(error => {
        toast({
          title: 'Error',
          description: error.message,
          variant: "destructive"
        })
        return undefined
      })
    }
  })
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  if (!cart) return <div>Load error</div>
  const formattedCart = cart.cart.map(cartItem => {
    return {
      productId: cartItem.ProductCart[0].productId,
      productName: cartItem.ProductCart[0].Product.name,
      productDesc: cartItem.ProductCart[0].Product.desc,
      productPrice: cartItem.ProductCart[0].Product.price,
      quantity: cartItem.ProductCart[0].quantity,
      productImg: cartItem.ProductCart[0].Product.img
    }
  })
  return (
    <div>
      <h2>Cart</h2>
      <div className='flex flex-col gap-4'>
        {formattedCart.map(cartItem => (
          <Card key={cartItem.productId} className='flex gap-4 p-4'>
            <h3>{cartItem.productName}</h3>
            <p>{cartItem.productDesc}</p>
            <p>{cartItem.productPrice}</p>
            <p>{cartItem.quantity}</p>
            <Image src={cartItem.productImg} alt={cartItem.productName} width={50} height={50} />
            <Button size={'icon'} variant={'destructive'} onClick={() => {
              fetch('/api/cart', {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  productId: cartItem.productId
                })
              }).then(res => {
                if (!res.ok) throw new Error('Network response was not ok')
                queryClient.invalidateQueries({ queryKey: ['cart'] })
                toast({
                  title: 'Success',
                  description: 'Item removed from cart',
                })
              })
            }}>
              <Trash2 />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
