import { useState } from "react";

function TagItem({ label, onRemove }) {
  return (
    <div className="bg-spooky-orange text-white px-2 py-1 z-10 rounded-2xl w-fit shrink cursor-default">
      {label}
      <button
        className="ml-1 text-spooky-orange font-bold focus:outline-none"
        onClick={onRemove}
      >
        <div className="text-white">&times;</div>
      </button>
    </div>
  );
}



export default function TagSelectBox({
  tagvalue,
  taglabel,
  tags,
  id,
  name,
  label,
  selectedTags,
  setSelectedTags}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleTagSelect = (tag) => {
    if (!selectedTags.includes(tag)) {
      console.log(tag);
      setSelectedTags([...selectedTags, tag]);
    }
    setSearchText("");
  };

  const handleTagRemove = (tag) => {
    const updatedTags = selectedTags.filter((t) => t !== tag);
    setSelectedTags(updatedTags);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredOptions = tags.filter((option) =>
    option[taglabel].toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="relative">
      <label htmlFor={id ? id : name} className="m-3 font-bold">
        {label}{" "}
      </label>
      <br />
      <div
        className="p-2 rounded-[2rem] text-gray-900 m-3 border border-black w-96 "
        onClick={toggleDropdown}
      >
        <div className="flex justify-between">
          <div className="grow flex flex-wrap gap-2">
            {selectedTags.map((tag) => {
              let t = tags.find((t) => t[tagvalue] === tag);
              return (
                <TagItem
                  key={t[taglabel]}
                  value={t[tagvalue]}
                  label={t[taglabel]}
                  onRemove={() => handleTagRemove(t[tagvalue])}
                />
              );
            })}
          </div>
          <span className="text-gray-500">▼</span>
        </div>
      </div>
      {isOpen && (
        <div className="absolute bg-white border border-gray-300 rounded-md shadow-md z-30 h-96 w-96 left-2 overflow-auto">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search tags"
              value={searchText}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            />
            {filteredOptions.map((option) => (
              <div
                key={option[tagvalue]}
                className={`flex items-center p-2  ${
                  selectedTags.includes(option.value)
                    ? "bg-spooky-orange text-white"
                    : ""
                }`}
                onClick={() => handleTagSelect(option[tagvalue])}
              >
                <span>{option[taglabel]}</span>
                {selectedTags.includes(option[tagvalue]) && (
                  <button
                    className="ml-2 text-spooky-orange font-bold focus:outline-none"
                    onClick={() => handleTagRemove(option[tagvalue])}
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
            {filteredOptions.length === 0 && (
              <div className="p-2 text-gray-500">No matching tags found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
