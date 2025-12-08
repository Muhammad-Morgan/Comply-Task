"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "../atoms/input";
import { Select, SelectTrigger, SelectValue } from "../atoms/select";
import { Button } from "../atoms/button";

const Filter = () => {
  const params = useSearchParams();
  const search = params.get("search") || "";

  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // getting values from data
    const formData = new FormData(e.currentTarget);
    // names have to be identical
    const search = formData.get("search") as string;
    const params = new URLSearchParams();
    params.set("search", search);
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <form
      className="bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div style={{ background: "var(--background)" }} className="rounded-lg">
        <Input
          type="text"
          placeholder="Search Jobs"
          name="search"
          defaultValue={search}
        />
      </div>
      <div style={{ background: "var(--background)" }} className="rounded-lg">
        <Select>
          {/* defaultValue = {jobStatus}/name="jobStatus"- unkown till now */}
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          {/* Will replace the list with the list of the provided filter */}
          {/* <SelectContent>
            {["all", ...Object.values(JobStatus)].map((filter) => {
              return (
                <SelectItem key={filter} value={filter}>
                  {filter}
                </SelectItem>
              );
            })}
          </SelectContent> */}
        </Select>
      </div>
      <Button type="submit">Search</Button>
    </form>
  );
};

export default Filter;
