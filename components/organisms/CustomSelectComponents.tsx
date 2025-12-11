"use client";

import * as React from "react";
import { Filter } from "lucide-react";

// Import *all* option lists from separate file.
import {
  SimpleOption,
  UserOption,
  INTEREST_OPTIONS,
  CATEGORY_OPTIONS,
  TAG_OPTIONS,
  USER_DIRECTORY,
} from "@/lib/lists";
import GenderSelectCard from "../molecules/GenderSelectCard";
import InterestsMultiSelect from "../molecules/InterestsMultiSelect";
import CategorySearchSelect from "../molecules/CategorySearchSelect";
import CountryAsyncSelect from "../molecules/CountryAsyncSelect";
import UserAsyncSelect from "../molecules/UserAsyncSelect";
import TagsMultiSelect from "../molecules/TagsMultiSelect";

// helper to get label from any list.
function getLabel(options: SimpleOption[], value: string) {
  return options.find((opt) => opt.value === value)?.label ?? "";
}

const CustomSelectComponents = () => {
  // ----------------- state -----------------
  const [gender, setGender] = React.useState(""); // gender select value

  const [interests, setInterests] = React.useState<string[]>([]);
  const [interestsOpen, setInterestsOpen] = React.useState(false); // chips dropdown

  const [category, setCategory] = React.useState("");
  const [categoryQuery, setCategoryQuery] = React.useState("");
  const [categoryOpen, setCategoryOpen] = React.useState(false);

  const [countryQuery, setCountryQuery] = React.useState("");
  const [selectedCountry, setSelectedCountry] =
    React.useState<SimpleOption | null>(null);
  const [countryOpen, setCountryOpen] = React.useState(false);

  const [userValue, setUserValue] = React.useState("");
  const [userQuery, setUserQuery] = React.useState("");
  const [matchingUsers, setMatchingUsers] =
    React.useState<UserOption[]>(USER_DIRECTORY);
  const [userOpen, setUserOpen] = React.useState(false);

  const [tagValues, setTagValues] = React.useState<string[]>([]);
  const [tagQuery, setTagQuery] = React.useState("");
  const [tagsOpen, setTagsOpen] = React.useState(false);

  // -------------- derived lists --------------
  // using useMemo to avoid unneccasry expensive calcs
  const filteredCategories = React.useMemo(() => {
    const q = categoryQuery.toLowerCase();
    return CATEGORY_OPTIONS.filter((option) =>
      option.label.toLowerCase().includes(q)
    );
  }, [categoryQuery]);

  const filteredTags = React.useMemo(() => {
    const q = tagQuery.toLowerCase();
    return TAG_OPTIONS.filter((tag) => tag.label.toLowerCase().includes(q));
  }, [tagQuery]);

  const selectedInterestCount = `${interests.length} of ${INTEREST_OPTIONS.length}`;
  const categoryLabel = category
    ? CATEGORY_OPTIONS.find((opt) => opt.value === category)?.label ?? ""
    : "";
  const countryLabel = selectedCountry?.label ?? "";
  const selectedUser = userValue
    ? USER_DIRECTORY.find((u) => u.value === userValue)
    : undefined;

  // -------------- click-outside close --------------
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    // close every dropdown when user clicks elsewhere
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setInterestsOpen(false);
        setCategoryOpen(false);
        setCountryOpen(false);
        setUserOpen(false);
        setTagsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // -------------- async-ish users --------------
  React.useEffect(() => {
    // fake async search: debounce filtering to mimic remote query
    const timeout = setTimeout(() => {
      const q = userQuery.toLowerCase();

      const matches = USER_DIRECTORY.filter(
        (user) =>
          user.label.toLowerCase().includes(q) ||
          user.email.toLowerCase().includes(q)
      );
      setMatchingUsers(matches);
    }, 250);

    return () => clearTimeout(timeout);
  }, [userQuery]);

  // -------------- handlers --------------
  const toggleInterest = (value: string) => {
    // limit interest selection to three items and allow toggling
    setInterests((prev) => {
      if (prev.includes(value)) {
        return prev.filter((v) => v !== value);
      }
      if (prev.length >= 3) return prev;
      return [...prev, value];
    });
  };

  const toggleTag = (value: string) => {
    // tags can be toggled without limit so just flip membership
    setTagValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // Generic keyboard handler for custom "div as button".
  const handleControlKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (
    event
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      (event.currentTarget as HTMLDivElement).click();
    }
  };
  return (
    <section
      id="custom-select-components"
      className="border-t border-slate-200 px-4 py-12 sm:px-6 lg:px-8"
    >
      <div
        // Entire surface is inside this ref so "click outside" logic doesn't immediately close menus.
        ref={wrapperRef}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-semibold text-primary-700">
            <Filter className="h-5 w-5" aria-hidden="true" />
            <span>Select Component Examples</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-6">
            {/* Gender */}
            <GenderSelectCard
              gender={gender}
              setGender={setGender}
              getLabel={getLabel}
            />
            {/* Interests (multi-select with dropdown) */}
            <InterestsMultiSelect
              interests={interests}
              selectedInterestCount={selectedInterestCount}
              interestsOpen={interestsOpen}
              setInterestsOpen={setInterestsOpen}
              handleControlKeyDown={handleControlKeyDown}
              getLabel={getLabel}
              toggleInterest={toggleInterest}
            />
            {/* Category – single select with search INSIDE dropdown ----- */}
            <CategorySearchSelect
              category={category}
              setCategory={setCategory}
              categoryLabel={categoryLabel}
              categoryQuery={categoryQuery}
              setCategoryQuery={setCategoryQuery}
              filteredCategories={filteredCategories}
              categoryOpen={categoryOpen}
              setCategoryOpen={setCategoryOpen}
              handleControlKeyDown={handleControlKeyDown}
            />
          </div>

          {/* RIGHT COLUMN ----------------------------------- */}
          <div className="space-y-6">
            {/* Country -------------------------------------- */}
            <CountryAsyncSelect
              query={countryQuery}
              onQueryChange={setCountryQuery}
              onSelect={(value, label) => {
                setSelectedCountry({ value, label });
              }}
              selectedLabel={countryLabel}
              open={countryOpen}
              setOpen={setCountryOpen}
              handleControlKeyDown={handleControlKeyDown}
            />

            {/* Assign to User -------------------------------- */}
            <UserAsyncSelect
              userValue={userValue}
              setUserValue={setUserValue}
              userQuery={userQuery}
              setUserQuery={setUserQuery}
              matchingUsers={matchingUsers}
              userOpen={userOpen}
              setUserOpen={setUserOpen}
              handleControlKeyDown={handleControlKeyDown}
              selectedUser={selectedUser}
            />

            {/* Tags (multi-select with search) --------------- */}
            <TagsMultiSelect
              tagValues={tagValues}
              toggleTag={toggleTag}
              tagsOpen={tagsOpen}
              setTagsOpen={setTagsOpen}
              handleControlKeyDown={handleControlKeyDown}
              tagQuery={tagQuery}
              setTagQuery={setTagQuery}
              filteredTags={filteredTags}
              getLabel={getLabel}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomSelectComponents;
