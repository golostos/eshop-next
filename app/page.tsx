import Catalog from "@/features/product/Catalog";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    manufacturer?: string;
  };
}) {
  return (
    <Suspense fallback="Loading...">
      <Catalog searchParams={searchParams} />
    </Suspense>
  );
}
