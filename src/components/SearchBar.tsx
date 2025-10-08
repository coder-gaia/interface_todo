import { Input, SearchWrapper } from "./SearchBarStyles";
import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <SearchWrapper>
      <FaSearch style={{ marginRight: '8px', color: '#888' }} />
      <Input
        placeholder="Search by title or status"
        value={value}
        onChange={onChange}
      />
    </SearchWrapper>
  );
}

export default SearchBar;