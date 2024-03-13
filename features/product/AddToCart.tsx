'use client';

import { Button } from '@/components/ui/button'
import { Product } from '@prisma/client';
import { Heart } from 'lucide-react';
import React from 'react'
import { useGetCart, useAddToCart } from '../cart/use-cart';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  product: Product
}

export default function AddToCart({ product }: Props) {  
  const { cart, isLoading } = useGetCart()
  const productInCart = cart?.find(cartItem => cartItem.productId === product.id)
  const { mutate: addToCart } = useAddToCart()
  if (isLoading) return <Skeleton className='h-8 w-full' />
  return (
    <>
      <Button variant="outline" size={"icon"}>
        <Heart />
      </Button>
      {productInCart ? (
        <div className="flex items-center gap-2">
          <Button
            className="w-8 h-8"
            onClick={() => {
              addToCart({
                productId: productInCart.productId,
                quantity: 1,
              });
            }}
          >
            +
          </Button>
          <p>{productInCart.quantity}</p>
          <Button className="w-8 h-8">-</Button>
        </div>
      ) : (
        <Button
          onClick={() => {
            addToCart({
              productId: product.id,
              quantity: 1,
            });
          }}
        >
          Buy
        </Button>
      )}
    </>
  );
}