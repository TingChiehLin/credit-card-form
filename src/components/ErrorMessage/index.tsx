import { FC } from "react";

interface ErrorMessageProp {
  text: string;
}

const ErrorMessage: FC<ErrorMessageProp> = ({ text }) => {
  return <div className="text-Error text-xs mt-3">{text}</div>;
};

export default ErrorMessage;
