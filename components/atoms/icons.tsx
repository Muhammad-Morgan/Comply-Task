import {
  AlertCircle,
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  Edit,
  Eye,
  Filter,
  Mail,
  Menu,
  Search,
  Trash2,
  Upload,
  UserPlus,
  Users,
  X,
  XCircle,
} from "lucide-react";

type IconDefinition = {
  icon: React.JSX.Element;
  label: string;
};
const iconLibrary: IconDefinition[] = [
  { icon: <Users />, label: "Users" },
  { icon: <UserPlus />, label: "UserPlus" },
  { icon: <Mail />, label: "Mail" },
  { icon: <ChevronRight />, label: "ChevronRight" },
  { icon: <ChevronLeft />, label: "ChevronLeft" },
  { icon: <Check />, label: "Check" },
  { icon: <X />, label: "X" },
  { icon: <Upload />, label: "Upload" },
  { icon: <Download />, label: "Download" },
  { icon: <Eye />, label: "Eye" },
  { icon: <Edit />, label: "Edit" },
  { icon: <Trash2 />, label: "Trash2" },
  { icon: <Search />, label: "Search" },
  { icon: <Filter />, label: "Filter" },
  { icon: <CheckCircle />, label: "CheckCircle" },
  { icon: <Menu />, label: "Menu" },
  { icon: <XCircle />, label: "XCircle" },
  { icon: <AlertCircle />, label: "AlertCircle" },
];

// Individual icon tile with hover/focus affordances.
const IconCard = ({ icon }: { icon: string }) => (
  <div className="flex flex-col gap-2 items-center justify-center border border-slate-200 rounded-lg p-4 hover:bg-primary-50 cursor-pointer transition-colors w-[115px] mx-auto">
    <div className="w-6 h-6 text-primary-600 hover:text-primary-700">
      {iconLibrary.find((ic) => ic.label === icon)?.icon}
    </div>
    <span className="text-sm font-medium text-slate-700 hover:text-primary-800">
      {icon}
    </span>
  </div>
);

export default IconCard;
