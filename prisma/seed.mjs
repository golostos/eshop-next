// @ts-check
// const PrismaClient = require('@prisma/client').PrismaClient
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function start() {
  /** @type {import("@prisma/client").Manufacturer | null} */
  let apple = await db.manufacturer.findFirst({
    where: {
      name: "Apple",
    },
  });
  let xiaomi = await db.manufacturer.findFirst({
    where: {
      name: "Xiaomi",
    },
  });
  let samsung = await db.manufacturer.findFirst({
    where: {
      name: "Samsung",
    },
  });
  if (apple && process.env.NODE_ENV === "production") {
    console.log("Data already exists, skipping seed");
    return;
  }

  if (!apple) {
    apple = await db.manufacturer.create({
      data: {
        name: "Apple",
      },
    });
  }
  if (!xiaomi) {
    xiaomi = await db.manufacturer.create({
      data: {
        name: "Xiaomi",
      },
    });
  }
  if (!samsung) {
    samsung = await db.manufacturer.create({
      data: {
        name: "Samsung",
      },
    });
  }

  await db.product.create({
    data: {
      name: "IPhone 22",
      img: "/products/iphone22.jpg",
      desc: "Amazing revolution IPhone 22",
      price: 21999.95,
      manufacturerId: apple.id,
    },
  });
  await db.product.create({
    data: {
      name: "IPhone 15 pro max",
      img: "/products/iphone15.jpg",
      desc: "Redneck IPhone 15",
      price: 1999.95,
      manufacturerId: apple.id,
    },
  });
  await db.product.create({
    data: {
      name: "IPhone 11",
      img: "/products/iphone15.jpg",
      desc: "Old IPhone 11",
      price: 999.95,
      manufacturerId: apple.id,
    },
  });

  await db.product.create({
    data: {
      name: "Samsung Galaxy S24",
      img: "/products/iphone22.jpg",
      desc: "1 ТБ желтый титан",
      price: 985,
      manufacturerId: samsung.id,
    },
  });
  await db.product.create({
    data: {
      name: "Xiaomi 13 Ultra",
      img: "/products/iphone22.jpg",
      desc: "12+512 ГБ чёрный",
      price: 766,
      manufacturerId: xiaomi.id,
    },
  });
  await db.product.create({
    data: {
      name: "Infinix Zero Ultra",
      img: "/products/iphone22.jpg",
      desc: "256 ГБ чёрный",
      price: 500,
      manufacturerId: xiaomi.id,
    },
  });
  await db.product.create({
    data: {
      name: "Samsung Galaxy S23 Ultra",
      img: "/products/iphone22.jpg",
      desc: "5G 256 ГБ золотой",
      price: 400,
      manufacturerId: samsung.id,
    },
  });
}

start();
