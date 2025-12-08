"use client";

import { getItemsAction } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import ItemCard from "../organisms/ItemCard";
import PaginationContainerComplex from "../organisms/PaginationContainerComplex";

const ItemsList = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const pageNumber = searchParams.get("page") || "1";
  const { data, isPending } = useQuery({
    queryKey: ["itemSearch", search, pageNumber],
    queryFn: () => getItemsAction({ search, page: pageNumber }),
  });
  const items = data?.items || [];
  const page = data?.page || 1;
  const totalPages = data?.totalPages || 0;
  if (isPending) {
    return <h2 className="text-xl">Please wait...</h2>;
  }
  if (items.length === 0) {
    return <h2 className="text-xl">No items found...</h2>;
  }

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold capitalize">
          <span className="text-muted-foreground">0</span> items found
        </h2>
        {totalPages < 2 ? null : (
          <PaginationContainerComplex
            currentPage={page}
            totalPages={totalPages}
          />
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {items.map((listItem) => {
          const { id, item } = listItem;
          return <ItemCard key={id} item={item} />;
        })}
      </div>
    </>
  );
};

export default ItemsList;
