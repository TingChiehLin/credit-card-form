import { FC, ChangeEvent, FocusEvent } from "react";

import ErrorMessage from "../ErrorMessage";

export interface InputTypeProp {
  label?: string;
  type: string;
  placeholder: string;
  value: string;
  name: string;
  isInValid: boolean;
  errorText: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  testId: string;
}

export const InputField: FC<InputTypeProp> = ({
  label,
  isInValid,
  errorText,
  testId,
  ...inputProps
}) => {
  const customInputClass =
    "w-full h-11 outline-none font-bold cursor-pointer outline-gray-200 hover:outline-purple-500 outline-2 rounded-md pl-4";
  const isErrorClass = isInValid && "outline-Error hover:outline-Error";
  return (
    <div>
      <label htmlFor={label} className="block mb-3 w-full">
        {label}
      </label>
      <div className="mb-8">
        <input
          {...inputProps}
          autoComplete="off"
          className={customInputClass + " " + isErrorClass}
          data-testid={`${testId}-input`}
        />
        {isInValid && (
          <ErrorMessage testId={`${testId}-error`} text={errorText} />
        )}
      </div>
    </div>
  );
};
