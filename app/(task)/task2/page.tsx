import ItemsList from "@/components/layouts/ItemsList";
import Filter from "@/components/organisms/Filter";
import { getItemsAction } from "@/lib/actions";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const ItemsPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["itemsSearch", "", 1],
    queryFn: () => getItemsAction({}),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Filter />
      <ItemsList />
    </HydrationBoundary>
  );
};

export default ItemsPage;
