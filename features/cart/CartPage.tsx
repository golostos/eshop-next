'use client';
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Cart, cartSchema } from './cart-schema';
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';

export default function CartPage() {
  const { toast } = useToast()
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
      <ul>
        {formattedCart.map(cartItem => (
          <li key={cartItem.productId}>
            <h3>{cartItem.productName}</h3>
            <p>{cartItem.productDesc}</p>
            <p>{cartItem.productPrice}</p>
            <p>{cartItem.quantity}</p>
            <Image src={cartItem.productImg} alt={cartItem.productName} width={50} height={50} />
          </li>
        ))}
      </ul>
    </div>
  )
}
