import { FC } from "react";

interface ButtonPropType {
  text: string;
  className: string;
}

const Button: FC<ButtonPropType> = ({ text, ...buttonProp }) => {
  return <button {...buttonProp}>{text}</button>;
};

export default Button;
