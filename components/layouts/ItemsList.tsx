"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { getItemsAction } from "@/lib/actions";
import ItemCard from "../organisms/ItemCard";
import Modal from "../organisms/Modal";
import PaginationContainerComplex from "../organisms/PaginationContainer";

type ItemSummary = {
  id: string;
  item: string;
};

const ItemsList = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  // const status = searchParams.get("status") || "";
  const pageNumber = searchParams.get("page") || "1";

  const { data, isPending } = useQuery({
    queryKey: ["itemSearch", search, pageNumber],
    queryFn: () => getItemsAction({ search, page: pageNumber }),
  });
  // response shape
  const items: ItemSummary[] = data?.items ?? [];
  const page = data?.page ?? 1;
  const totalPages = data?.totalPages ?? 0;

  if (isPending) {
    return <h2 className="text-xl">Please wait...</h2>;
  }

  if (items.length === 0) {
    return <h2 className="text-xl">No items found...</h2>;
  }

  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold capitalize">
          <span className="text-muted-foreground">{items.length}</span> items
          found
        </h2>
        {totalPages >= 2 ? (
          <PaginationContainerComplex
            currentPage={page}
            totalPages={totalPages}
          />
        ) : null}
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {items.map(({ id, item }: ItemSummary) => (
          <ItemCard
            key={id}
            title={item}
            subtitle={`Item ID: ${id}`}
            description="Demo inventory entry"
            metadata={[
              { label: "Identifier", value: id },
              { label: "Query", value: search || "Any" },
            ]}
            actions={[
              { label: "View details", href: "#" },
              {
                label: "Feature",
                onClick: () => console.log("Feature item", id),
                variant: "secondary",
              },
            ]}
            footer={
              <Modal
                triggerLabel="Delete"
                triggerVariant="outline"
                onConfirm={() => console.log("Delete item", id)}
              />
            }
          >
            <p className="text-sm text-muted-foreground">
              This is placeholder copy for <strong>{item}</strong>. Replace with
              actual summary or attributes when data is ready.
            </p>
          </ItemCard>
        ))}
      </div>
    </>
  );
};

export default ItemsList;
