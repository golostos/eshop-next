// const PrismaClient = require('@prisma/client').PrismaClient
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function start() {
  await db.product.create({
    data: {
      name: "IPhone 22",
      img: "/products/iphone22.jpg",
      desc: "Amazing revolution IPhone 22",
      price: 21999.95,
    },
  });
  await db.product.create({
    data: {
      name: "IPhone 15 pro max",
      img: "/products/iphone15.jpg",
      desc: "Redneck IPhone 15",
      price: 1999.95,
    },
  });
  await db.product.create({
    data: {
      name: "IPhone 11",
      img: "/products/iphone15.jpg",
      desc: "Old IPhone 11",
      price: 999.95,
    },
  });
  await db.product.create({
    data: {
      name: "IPhone 7",
      img: "/products/iphone15.jpg",
      desc: "Ancient IPhone 7",
      price: 399.95,
    },
  });
  await db.product.create({
    data: {
      name: "IPhone 4",
      img: "/products/iphone15.jpg",
      desc: "Prehistoric IPhone 4",
      price: 199.95,
    },
  });
}

start();
