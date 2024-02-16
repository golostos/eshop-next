import React from 'react'
import ProductCard from './ProductCard'
import { db } from '@/prisma/db'
// only server:
// import { setTimeout as wait } from 'node:timers/promises'

export default async function Catalog() {
  const catalog = await db.product.findMany()
  // await wait(2000)
  return (
    <div>
      <h2>Catalog</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {
          catalog.map(product => {
            return <ProductCard product={product} key={product.id} />
          })
        }
      </div>
    </div>
  )
}
