// ready for the provided links
import {
  AreaChart,
  Layers,
  AppWindow,
  Workflow,
  Users2,
  Globe2,
  Filter,
} from "lucide-react";
type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};
export const links: NavLink[] = [
  {
    href: "/task",
    label: "Task1",
    icon: <Layers />,
  },
  {
    href: "/task2",
    label: "Task2",
    icon: <AreaChart />,
  },
  {
    href: "/task3",
    label: "Task3",
    icon: <AppWindow />,
  },
  {
    href: "/task4",
    label: "Task4",
    icon: <Workflow />,
  },
];
export type SimpleOption = {
  value: string;
  label: string;
};

// Simple static lists used by the selects.
export const GENDER_OPTIONS: SimpleOption[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export const INTEREST_OPTIONS: SimpleOption[] = [
  { label: "Technology", value: "technology" },
  { label: "Design", value: "design" },
  { label: "Business", value: "business" },
  { label: "Marketing", value: "marketing" },
  { label: "Art", value: "art" },
  { label: "Music", value: "music" },
  { label: "Sports", value: "sports" },
  { label: "Travel", value: "travel" },
  { label: "Food", value: "food" },
  { label: "Science", value: "science" },
];

export const CATEGORY_OPTIONS: SimpleOption[] = [
  { label: "Technology", value: "tech" },
  { label: "Design", value: "design" },
  { label: "Business", value: "business" },
  { label: "Marketing", value: "marketing" },
  { label: "Education", value: "education" },
  { label: "Health", value: "health" },
  { label: "Entertainment", value: "entertainment" },
];

export const COUNTRY_OPTIONS: SimpleOption[] = [
  { label: "Egypt", value: "eg" },
  { label: "United States", value: "us" },
  { label: "Canada", value: "ca" },
  { label: "United Kingdom", value: "uk" },
  { label: "Australia", value: "au" },
  { label: "Germany", value: "de" },
  { label: "France", value: "fr" },
  { label: "Japan", value: "jp" },
  { label: "South Korea", value: "kr" },
  { label: "China", value: "cn" },
  { label: "India", value: "in" },
  { label: "Brazil", value: "br" },
  { label: "Russia", value: "ru" },
  { label: "Saudi Arabia", value: "sa" },
  { label: "South Africa", value: "za" },
];

// Tags for the “Tags (Multi-select with Search)” example.
export const TAG_OPTIONS: SimpleOption[] = [
  { label: "Important", value: "important" },
  { label: "New", value: "new" },
  { label: "In Progress", value: "in-progress" },
  { label: "Blocked", value: "blocked" },
  { label: "Design", value: "design" },
  { label: "Backend", value: "backend" },
  { label: "Frontend", value: "frontend" },
  { label: "Marketing", value: "marketing" },
];

export type UserOption = SimpleOption & { email: string };

export const USER_DIRECTORY: UserOption[] = [
  { value: "1", label: "John Doe", email: "john@example.com" },
  { value: "2", label: "Jane Smith", email: "jane@example.com" },
  { value: "3", label: "Bob Johnson", email: "bob@example.com" },
  { value: "4", label: "Alice Brown", email: "alice@example.com" },
  { value: "5", label: "Charlie Wilson", email: "charlie@example.com" },
  { value: "6", label: "Diana Miller", email: "diana@example.com" },
  { value: "7", label: "Edward Davis", email: "edward@example.com" },
  { value: "8", label: "Fiona Garcia", email: "fiona@example.com" },
];
export const features = [
  {
    icon: <Users2 className="h-5 w-5 text-primary-600" />,
    title: "Multiple Select Types",
    desc: "Single select, multi-select, and async select with pagination",
  },
  {
    icon: <Globe2 className="h-5 w-5 text-primary-600" />,
    title: "Data Sources",
    desc: "Static arrays, frontend search, and backend API calls",
  },
  {
    icon: <Filter className="h-5 w-5 text-blue-500" />,
    title: "Advanced Features",
    desc: "Debounced search, infinite scroll, max selection limits",
  },
];
