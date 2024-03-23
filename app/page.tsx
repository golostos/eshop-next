import Catalog from "@/features/product/Catalog";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <Suspense fallback="Loading...">
      <Catalog />
    </Suspense>
  );
}
