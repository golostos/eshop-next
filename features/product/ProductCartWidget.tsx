'use client';

import { Button } from '@/components/ui/button'
import { Product } from '@prisma/client';
import { Heart } from 'lucide-react';
import React from 'react'
import { useGetCart, useAddToCart, useUpdateCart } from '../cart/use-cart';
import { Skeleton } from '@/components/ui/skeleton';
import { useAddToFavorite, useGetFavorites, useRemoveFromFavorites } from '../favorites/use-favorites';
import { cn } from '@/lib/utils';

type Props = {
  product: Product
}

export default function ProductCartWidget({ product }: Props) {
  const { cart, isLoading } = useGetCart()
  const { mutate: addToFavorite } = useAddToFavorite()
  const { mutate: removeFromFavorites } = useRemoveFromFavorites()
  const { mutate: updateCart } = useUpdateCart();
  const { favorites, isLoading: favoritesLoading } = useGetFavorites()
  const productInCart = cart?.find(cartItem => cartItem.productId === product.id)
  const { mutate: addToCart } = useAddToCart()
  if (isLoading) return <Skeleton className='h-8 w-full' />
  const isFavorite = Boolean(favorites?.find(item => item.Product.id === product.id))
  return (
    <>
      <Button variant="outline" size={"icon"} onClick={() => {
        if (isFavorite) removeFromFavorites({ productId: product.id })
        else addToFavorite({ productId: product.id })
      }}>
        <Heart className={cn({
          'text-red-500': isFavorite
        })} />
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
          <Button className="w-8 h-8" onClick={() => {
            updateCart({
              productId: product.id,
              quantity: productInCart.quantity - 1
            })
          }}>-</Button>
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