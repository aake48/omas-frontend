import { useField } from "formik";
import { useState, useEffect, useRef} from "react";
import { Cross1Icon } from "@radix-ui/react-icons"
interface SeriesComboboxProps {
  label: string;
  name: string;
  placeholder: string;
  options: string[];
}

export default function SeriesCombobox({
  label,
  options,
  ...props
}: SeriesComboboxProps) {
  const [field, meta, helpers] = useField(props);
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<string[]>(field.value || []);
  const ref = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(
    (option) =>
      option.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedOptions.includes(option)
  );


  const handleSelect = (option: string) => {
    setSelectedOptions([...selectedOptions, option]);
    helpers.setValue([...selectedOptions, option]); 
    setInputValue("");
    setIsFocused(false);
  };

  const handleAddNewSeries = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const newSeries = inputValue.trim();
      if (!selectedOptions.includes(newSeries)) {
        setSelectedOptions([...selectedOptions, newSeries]);
        helpers.setValue([...selectedOptions, newSeries]);
      }
      setInputValue("");
    }
  };


  
  useEffect(() => {
    //Close the combobox after clicking outside of it
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]
  );

  const handleRemove = (option: string) => {
    const updatedOptions = selectedOptions.filter((item) => item !== option);
    setSelectedOptions(updatedOptions);
    helpers.setValue(updatedOptions);
  };

  return (
    <div className="relative">
      {meta.touched && meta.error && (
        <span className="absolute -bottom-5 left-1 text-sm bg-red-100 rounded-b-md p-1 text-red-700">
          {meta.error}
        </span>
      )}
      <label
        htmlFor={field.name}
        className={` font-light left-2 md:text-xl text-md transition-all" ${
          meta.touched && meta.error ? " text-red-500" : "text-black"
      }`}
      >{label}
      </label>
      <input
        {...field}
        {...props}
        id={field.name}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleAddNewSeries}
        onFocus={() => setIsFocused(true)}
        className={`block z-50 my-2 w-full hover:bg-slate-100 focus:bg-slate-100 text-black rounded-lg border transition-colors duration-300 md:text-xl text-md px-3 py-2 ${
          meta.touched && meta.error ? "border-red-500" : "border-slate-500"}`
        }
        placeholder={props.placeholder}
      />

      {isFocused && filteredOptions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border transition-colors rounded-md shadow-lg z-10"  ref={ref}>
          {filteredOptions.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="p-2 cursor-pointer hover:bg-blue-400 focus:bg-slate-100 text-black md:text-xl text-md px-3 py-2"
            >
              {option}
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-2 my-2">
        <p>Lisätyt sarjat:</p>
        {selectedOptions.map((option) => (
          <span key={option} className="flex items-center bg-yellow-100 text-black px-2 py-1 rounded-lg">
            {option}
            <button type="button" onClick={() => handleRemove(option)} className="ml-2">
              <Cross1Icon/>
            </button>
          </span>
        ))}
      </div>
    </div>
    
  );
}
