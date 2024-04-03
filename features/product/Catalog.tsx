import React from 'react'
import ProductCard from './ProductCard'
import { db } from '@/prisma/db'
import Filter from '../filters/Filter';
import { Prisma } from '@prisma/client';

export default async function Catalog({
  searchParams,
}: {
  searchParams?: {
    manufacturer?: string;
    search?: string;
  };
}) {
  // Делаем объект where для запроса к базе для двух фильтров. Если фильтр не выбран, то он не участвует в запросе
  const where: Prisma.ProductWhereInput = {}
  if (searchParams?.manufacturer) where.manufacturerId = parseInt(searchParams.manufacturer)
  if (searchParams?.search) where.name = { contains: searchParams.search }

  const catalog = await db.product.findMany({
    where,
  });

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
