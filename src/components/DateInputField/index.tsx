import { FC, ChangeEvent } from "react";

import ErrorMessage from "../ErrorMessage";

interface DateInputFieldProp {
  label: string;
  MM: string;
  YY: string;
  isError: boolean;
  errorText: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DateInputField: FC<DateInputFieldProp> = ({
  label,
  MM,
  YY,
  isError,
  errorText,
  ...DateInputField
}) => {
  const customInputClass =
    "w-24 h-11 outline-none font-bold cursor-pointer outline-gray-200 hover:outline-purple-500 outline-2 pl-4 rounded-md";
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={label} className="block mb-3 w-full">
        {label}
      </label>
      <div className="flex gap-4">
        <div>
          <input
            className={customInputClass}
            type="number"
            value={MM}
            name="MM"
            placeholder="MM"
            autoComplete="off"
            {...DateInputField}
          />
          <div className="w-full">
            {isError && <ErrorMessage text={errorText} />}
          </div>
        </div>
        <input
          className={customInputClass}
          type="number"
          value={YY}
          name="YY"
          placeholder="YY"
          autoComplete="off"
          {...DateInputField}
        />
      </div>
    </div>
  );
};

export default DateInputField;
