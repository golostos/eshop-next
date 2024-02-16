'use server';

import { db } from "@/prisma/db";

export default async function addToCartAction() {
  await db.product.create({
    data: {
      name: "IPhone 21",
      img: "/products/iphone22.jpg",
      desc: "Amazing revolution IPhone 21",
      price: 11999.95
    }
  })
}