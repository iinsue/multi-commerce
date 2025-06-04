import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { trpc, getQueryClient } from "@/trpc/server";

import {
  ProductList,
  ProductListSkeleton,
} from "@/modules/products/ui/components/product-list";

interface Props {
  params: Promise<{ category: string }>;
}

// http://localhost:3000/[category]
const CategoryPage = async ({}: Props) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.products.getMany.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList />
      </Suspense>
    </HydrationBoundary>
  );
};

export default CategoryPage;
