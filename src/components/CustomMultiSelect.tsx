import { ChevronDown, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

interface MultiSelectProps {
  options: { label: string; value: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selected,
  onChange,
  placeholder = "Select items...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle item selection
  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  // Remove selected item
  const removeItem = (value: string) => {
    onChange(selected.filter((item) => item !== value));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter options based on search
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full z-50" ref={dropdownRef}>
      {/* Dropdown Button */}
      <div
        className="w-full border border-gray-300 bg-white rounded-lg p-2 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-2">
          {selected.length > 0 ? (
            selected.map((value) => {
              const option = options.find((opt) => opt.value === value);
              return (
                <span
                  key={value}
                  className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full text-sm"
                >
                  {option?.label}
                  <X
                    className="cursor-pointer text-gray-600 hover:text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(value);
                    }}
                  />
                </span>
              );
            })
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
        <ChevronDown className={`transition ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border-b outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Options List */}
          <div className="max-h-40 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(option.value)}
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(option.value)}
                    onChange={() => {}}
                    className="mr-2"
                  />
                  {option.label}
                </div>
              ))
            ) : (
              <p className="p-2 text-gray-500">No results found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
