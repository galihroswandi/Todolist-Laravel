import PropTypes from "prop-types";

export default function InputForm(props) {
  const { title, type, placeholder, value, callback } = props;

  return (
    <label
      htmlFor="title"
      className="flex flex-col gap-y-1 mt-3 text-slate-600"
    >
      <span className="text-sm">{title}</span>
      <input
        type={type}
        name={title}
        id="title"
        value={value}
        placeholder={placeholder || ""}
        onChange={(e) => callback(e.target.value)}
        className="border rounded-[.1rem] px-3 py-2 text-sm outline-none bg-primary border-[#B5D665] text-slate-500"
        autoComplete="off"
      />
    </label>
  );
}

InputForm.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  callback: PropTypes.func,
};
