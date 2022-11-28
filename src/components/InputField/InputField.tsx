import { FC, ChangeEvent } from "react";

import ErrorMessage from "../ErrorMessage";

export interface InputTypeProp {
  label?: string;
  type: string;
  placeholder: string;
  value: string;
  name: string;
  isError: boolean;
  errorText: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputField: FC<InputTypeProp> = ({
  label,
  isError,
  errorText,
  ...inputProps
}) => {
  return (
    <div>
      <label htmlFor={label} className="block mb-3 w-full">
        {label}
      </label>
      <div className="mb-8">
        <input
          {...inputProps}
          autoComplete="off"
          className={`w-full h-11 outline-none font-bold cursor-pointer outline-gray-200 hover:outline-purple-500 outline-2 rounded-md pl-4 
        ${isError && ""}`}
        />
        {isError && <ErrorMessage text={errorText} />}
      </div>
    </div>
  );
};
