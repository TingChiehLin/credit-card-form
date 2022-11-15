import { FC, ChangeEvent } from "react";

export interface InputTypeProp {
  label?: string;
  type: string;
  placeholder: string;
  value: string;
  name: string;
  className: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputField: FC<InputTypeProp> = ({
  label,
  onChange,
  ...inputProps
}) => {
  return (
    <div>
      <label htmlFor={label} className="block mb-3 w-full">
        {label}
      </label>
      <input {...inputProps} onChange={onChange} />
    </div>
  );
};
