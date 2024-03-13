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
import AddToCart from "./AddToCart";

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
        <Image
          src={product.img}
          alt={product.name}
          width={500}
          height={500}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <AddToCart product={product} />
      </CardFooter>
    </Card>
  );
}
