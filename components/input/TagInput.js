import { useEffect, useState } from "react";

function TagItem({ tag, onRemove }) {
  return (
    <div className="bg-spooky-orange text-white px-2 py-1 rounded-2xl flex cursor-default">
      {tag}
      <div
        className="ml-1 font-bold focus:outline-none text-white cursor-pointer"
        onClick={onRemove}
      >
        &times;
      </div>
    </div>
  );
}



export function TagInput({ label,   id, name,  tags, setTags }) {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue?.trim()?.length > 0 && inputValue) {
      e.preventDefault();
      let nextTags = [...tags];
      if (!tags.includes(inputValue.trim()) || nextTags.length > tags.length) {
        console.log("inputValue", inputValue.trim(), inputValue.trim().length);
        setTags([...tags, inputValue]);
      }
        
      setInputValue("");
      console.log("inputValue");
    }
  };

  useEffect(() => {
    console.log(tags);
  }, [tags])

  const handleTagRemove = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag != tagToRemove);
    setTags(updatedTags);
  };

  return (
    <div>
      <label htmlFor={id ? id : name} className="m-3 font-bold">
        {label}{" "}
      </label>
      <br></br>
      <div className=" p-2 rounded-[2rem] text-gray-900 m-3 border border-black w-96 ">
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <TagItem
              key={tag}
              tag={tag}
              onRemove={() => handleTagRemove(tag)}
            />
          ))}
        </div>

        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Type and Enter to add"
          className="border border-none focus:ring-0 w-full rounded-md focus:outline-none"
        />
      </div>
    </div>
  );
}
