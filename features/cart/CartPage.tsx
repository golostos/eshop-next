"use client";
import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Wallet } from "lucide-react";
import {
  useAddToCart,
  useGetCart,
  useRemoveFromCart,
  useUpdateCart,
} from "./use-cart";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import CartClearDialog from "./CartClearDialog";

export default function CartPage() {
  const { mutate: addToCart } = useAddToCart();
  const { mutate: updateCart } = useUpdateCart();
  const { mutate: removeFromCart } = useRemoveFromCart();
  const { cart, isLoading, isError } = useGetCart();
  const router = useRouter();
  if (isLoading)
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl mt-2">Cart</h2>
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
      </div>
    );
  if (isError) return <div>Error</div>;
  if (!cart) return <div>Load error</div>;
  const formattedCart = cart.map((cartItem) => {
    return {
      productId: cartItem.productId,
      productName: cartItem.Product.name,
      productDesc: cartItem.Product.desc,
      productPrice: cartItem.Product.price,
      quantity: cartItem.quantity,
      productImg: cartItem.Product.img,
    };
  });
  if (formattedCart.length === 0) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-8 items-center justify-center">
        <h2>Cart is empty</h2>
        <Button
          onClick={() => {
            router.push("/");
          }}
        >
          Start shopping
        </Button>
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-2xl mt-2">Cart</h2>
      <div className="flex flex-col gap-4 mt-4">
        {formattedCart.map((cartItem) => (
          <Card
            key={cartItem.productId}
            className="flex gap-8 p-4 items-center"
          >
            <h3>{cartItem.productName}</h3>
            <p>{cartItem.productDesc}</p>
            <p>{cartItem.productPrice}</p>
            <div className="flex items-center gap-2">
              <Button
                className="w-8 h-8"
                onClick={() => {
                  addToCart({
                    productId: cartItem.productId,
                    quantity: 1,
                  });
                }}
              >
                +
              </Button>
              <p>{cartItem.quantity}</p>
              <Button
                className="w-8 h-8"
                onClick={() => {
                  updateCart({
                    productId: cartItem.productId,
                    quantity: cartItem.quantity - 1,
                  });
                }}
              >
                -
              </Button>
            </div>
            <Image
              src={cartItem.productImg}
              alt={cartItem.productName}
              width={50}
              height={50}
              className="mr-auto"
            />
            <Button
              size={"icon"}
              variant={"destructive"}
              onClick={() => {
                removeFromCart({
                  productId: cartItem.productId,
                });
              }}
            >
              <Trash2 />
            </Button>
          </Card>
        ))}
      </div>
      <div className="w-full flex items-center justify-end mt-8 gap-4">
        <Button
          onClick={() => {
            // router.push("/");
          }}
          className="flex items-center gap-2"
        >
          Buy
          <Wallet />
        </Button>
        <CartClearDialog
          onClear={() => {
            removeFromCart({});
          }}
        >
          <Button
            variant={"destructive"}
            className="flex items-center gap-2"
          >
            Clear cart
            <Trash2 />
          </Button>
        </CartClearDialog>
      </div>
    </div>
  );
}
