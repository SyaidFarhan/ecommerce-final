export default function InputComponent({
  label,
  placeholder,
  onChange,
  value,
  type,
  id,
  autocomplete,
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="relative">
      <label
        htmlFor={inputId}
        className="absolute -top-2.5 left-3 px-1 text-xs font-medium text-brand bg-white z-10"
      >
        {label}
      </label>
      <input
        id={inputId}
        placeholder={placeholder}
        type={type || "text"}
        value={value}
        onChange={onChange}
        autoComplete={autocomplete}
        className="w-full border-2 border-brand rounded-lg px-4 pt-4 pb-3.5 text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-150"
      />
    </div>
  );
}
