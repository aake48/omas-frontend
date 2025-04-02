import { useField } from "formik";

interface CustomInputProps {
  label: string;
  name: string;
  placeholder: string;
  options: string[];
}

export default function CustomInput({
  label,
  options,
  ...props
}: Readonly<CustomInputProps>) {
  const [field, meta] = useField(props);
  return (
    <div className="relative">
      {meta.touched && meta.error && (
        <span className=" absolute -bottom-5 left-1 text-sm bg-red-100 rounded-b-md p-1 text-red-700">
          {meta.error}
        </span>
      )}
      <label
        htmlFor={field.name}
        className={` font-light left-2  md:text-xl text-md transition-all ${
          meta.touched && meta.error ? " text-red-500" : "text-black"
        }`}
      >
        {label}
      </label>
      <select
        id={field.name}
        {...field}
        {...props}
        className={`block z-50 my-2 w-full hover:bg-slate-100 focus:bg-slate-100 text-black rounded-lg border transition-colors  duration-300 md:text-xl text-md px-3 py-2 ${
          meta.touched && meta.error ? "border-red-500" : "border-slate-500"
        }`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
