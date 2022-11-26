import { FC, ChangeEvent } from "react";

interface DateInputFieldProp {
  label: string;
  MM: string;
  YY: string;
  className: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DateInputField: FC<DateInputFieldProp> = ({
  label,
  MM,
  YY,
  className,
  ...DateInputField
}) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={label} className="block mb-3 w-full">
        {label}
      </label>
      <div className="flex gap-4">
        <input
          {...DateInputField}
          className={className}
          value={MM}
          placeholder="MM"
          autoComplete="off"
        />
        <input
          {...DateInputField}
          className={className}
          value={YY}
          placeholder="YY"
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default DateInputField;
