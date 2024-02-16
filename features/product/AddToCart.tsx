'use client';

import { Button } from '@/components/ui/button'
import { db } from '@/prisma/db';
import { Product } from '@prisma/client';
import { Heart } from 'lucide-react';
import React from 'react'
import addToCartAction from './addToCartAction';

type Props = {
  product: Product
}

export default function AddToCart({ product }: Props) {
  
  return (
    <>
      <Button variant="outline" size={'icon'}><Heart /></Button>
      <Button onClick={async () => {
        await addToCartAction()
      }}>Buy</Button>
    </>
  )
}