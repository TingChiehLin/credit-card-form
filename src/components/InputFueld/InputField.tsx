import { FC } from "react";

export interface InputTypeProp {
  labelTitle?: string;
  InputType: string;
  placeholderText: string;
  InputValue: string;
  Inputname: string;
  className: string;
}

export const InputField: FC<InputTypeProp> = ({
  labelTitle,
  InputType,
  placeholderText,
  InputValue,
  Inputname,
  className,
}) => {
  return (
    <div>
      <label htmlFor={Inputname} className="block mb-3">
        {labelTitle}
      </label>
      <input
        type={InputType}
        name={Inputname}
        placeholder={placeholderText}
        value={InputValue}
        className={className}
      />
    </div>
  );
};
