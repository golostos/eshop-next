import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { db } from '@/prisma/db'
import Image from 'next/image'
import React from 'react'

export default async function CatalogPage() {
  const catalog = await db.product.findMany()
  return (
    <div>
      <h2>Catalog</h2>
      <div className='grid grid-cols-3'>
        {
          catalog.map(product => {
            return <Card className="w-[350px]" key={product.id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <Image src={product.img} alt={product.name} />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Buy</Button>
              </CardFooter>
            </Card>
          })
        }
      </div>
    </div>
  )
}
