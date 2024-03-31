import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Product } from "@prisma/client";
import ProductCartWidget from "./ProductCartWidget";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({
  product,
}: ProductCardProps) {  
  return (
    <Card
      className="transition-transform hover:-translate-y-2"
      key={product.id}
    >
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.desc}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-96 sm:h-72 lg:h-48">
          <Image
            src={product.img}
            alt={product.name}
            fill
            className="object-contain"
            sizes="(min-width: 1560px) 205px, (min-width: 1520px) calc(-340vw + 5441px), (min-width: 1280px) calc(13.64vw + 68px), (min-width: 1040px) calc(33.64vw - 85px), (min-width: 640px) calc(50vw - 89px), calc(100vw - 113px)"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <ProductCartWidget product={product} />
      </CardFooter>
    </Card>
  );
}
