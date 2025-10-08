import { Input } from "./SearchBarStyles";

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder }) => {
  return <Input placeholder={placeholder} />;
};

export default SearchBar;