import React from 'react'
import ProductCard from './ProductCard'
import { db } from '@/prisma/db'
import Filter from '../filters/Filter';

export default async function Catalog({
  searchParams,
}: {
  searchParams?: {
    manufacturer?: string;
  };
}) {
  console.log(searchParams);
  const catalog =
    searchParams?.manufacturer && searchParams?.manufacturer !== "0"
      ? await db.product.findMany({
          where: {
            manufacturerId: parseInt(
              searchParams.manufacturer
            ),
          },
        })
      : await db.product.findMany();
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl mt-2 mb-4">Catalog</h2>
        <Filter />
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {catalog.map((product) => {
          return (
            <ProductCard
              product={product}
              key={product.id}
            />
          );
        })}
      </div>
    </div>
  );
}
