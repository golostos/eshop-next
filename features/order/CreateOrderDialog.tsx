import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCreateOrder } from "./use-order";

export default function CreateOrderDialog() {
  const { mutate: makeOrder } = useCreateOrder();
  const [address, setAddress] = useState("");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          Buy
          <Wallet />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Order confirmation</DialogTitle>
          <DialogDescription>
            Write your address to order confirmation
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Address
            </Label>
            <Input 
              id="address" 
              className="col-span-3" 
              onChange={e => setAddress(e.target.value)}
              value={address}
            />
          </div>
        </div>
        <DialogFooter>
          <Button            
            onClick={() => {
              makeOrder({ address });
            }}
          >
            Make order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
