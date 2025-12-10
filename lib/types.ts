import { Control, FieldValues, Path } from "react-hook-form";
import { ComplianceItem } from "./actions";
// ComplianceTable and ComplianceWrapper
export type Column<T> = {
  key: keyof T;
  header: string;
  render?: (row: T) => React.ReactNode;
};
export interface ComplianceTableProps<T> {
  columns: Column<T>[];
  data: T[];
  page: number;
  pageCount: number;
  onPageChange?: (page: number) => void;
  onRowSelect?: (row: T) => void;
}
export type Props = {
  initialData: ComplianceItem[];
  page: number;
  pageCount: number;
  initialSearch: string;
  status?: "idle" | "loading" | "error";
  statusMessage?: React.ReactNode;
};
// FormComponents
export type CustomInputFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
};
export type CustomSelectFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  items: string[];
  labelText: string;
};
// PaginationContainer
export type ButtonContainerProps = {
  currentPage: number;
  totalPages: number;
};
export type ButtonProps = {
  page: number;
  activeClass: boolean;
};
