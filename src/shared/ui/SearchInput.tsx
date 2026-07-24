import { Search } from "lucide-react";

type SearchInputProps = {
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

const SearchInput = ({
  id = "search",
  placeholder = "Search...",
  value,
  onChange,
}: SearchInputProps) => {
  return (
    <div className="hidden sm:flex items-center gap-2 rounded-md ring-1 ring-gray-200 px-2 py-1 shadow-md">
      <Search className="w-4 h-4 text-gray-500" />
      <input
        id={id}
        value={value}
        placeholder={placeholder}
        className="text-sm outline-0"
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
