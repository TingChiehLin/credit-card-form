import { FC } from "react";

interface ErrorMessageProp {
  text: string;
  testId?: string;
}

const ErrorMessage: FC<ErrorMessageProp> = ({ text, testId }) => {
  return (
    <div className="text-Error text-xs mt-3" data-testid={testId}>
      {text}
    </div>
  );
};

export default ErrorMessage;
