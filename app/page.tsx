import Catalog from "@/features/product/Catalog";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback="Loading...">
      <Catalog />
    </Suspense>
  );
}
