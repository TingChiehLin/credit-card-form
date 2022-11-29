import { FormEvent, ChangeEvent, useState } from "react";
import { InputField } from "./components/InputField";

import ImageCard from "./assets/BG_Card.png";
import Button from "./components/Button";
import DateInputField from "./components/DateInputField";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

const App = () => {
  interface CCForm {
    cardholderName: string;
    cardNumber: string;
    MM: string;
    YY: string;
    CVC: string;
  }

  const [values, setValues] = useState<CCForm>({
    cardholderName: "",
    cardNumber: "",
    MM: "",
    YY: "",
    CVC: "",
  });

  const [isSuccessful, setisSuccessful] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(true);

  const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setisLoading(true);
    setisSuccessful(false);
    if (
      isCardholderInValid ||
      !isCardNumberInValid ||
      !isMMInValid ||
      !isYYInValid ||
      !isCVCInValid
    ) {
      setisSuccessful(true);
    }
  };

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const closeLoadingHandler = () => {
    setisLoading(false);
  };

  const isCardholderInValid = values["cardholderName"].trim() === "";
  const isCardNumberInValid = isNaN(Number(values["cardNumber"]));
  const isMMInValid = values["MM"].trim() === "";
  const isYYInValid = values["YY"].trim() === "";
  const isCVCInValid = values["CVC"].trim() === "";

  return (
    <>
      <div className="absolute top-0 w-1/4 h-screen bg-gradient-to-b from-cyan-500 to-violet-500 -z-0"></div>
      {isLoading && (
        <div
          className="
                      fixed 
                      inset-0 
                      flex justify-center items-center
                      bg-[#00000080]
                      transition ease-in delay-300 overflow-auto
                      z-20
                      "
        >
          <AiOutlineLoading3Quarters
            size={"2rem"}
            color={"white"}
            onClick={closeLoadingHandler}
          />
        </div>
      )}
      <div className="flex justify-center items-center absolute top-1/2 -translate-y-1/2 left-[12%] z-10">
        <img className="" alt="bg-card" src={ImageCard} />
        <form
          onSubmit={submitFormHandler}
          className="w-[381px] h-[352px] ml-[8rem]"
          noValidate
          autoComplete="off"
        >
          <InputField
            label={"Cardholder Name"}
            type={"text"}
            placeholder="e.g. Jane Appleseed"
            value={values["cardholderName"]}
            name={"cardholderName"}
            onChange={changeEventHandler}
            isInValid={isCardholderInValid}
            errorText={"Card Holder Name can not be blank"}
          />
          <InputField
            label={"Card Number"}
            type={"text"}
            placeholder="e.g. 1234 5678 9123 0000"
            value={values["cardNumber"]}
            name={"cardNumber"}
            onChange={changeEventHandler}
            isInValid={isCardNumberInValid}
            errorText={"Wrong format, numbers only"}
          />
          <div className="flex items-start gap-6">
            <DateInputField
              label={"Exp. Date (MM/YY)"}
              MM={values["MM"]}
              YY={values["YY"]}
              onChange={changeEventHandler}
              isInValidMM={isMMInValid}
              isInValidYY={isYYInValid}
              errorText={"Can’t be blank"}
            />
            <InputField
              label={"CVC"}
              type={"number"}
              placeholder="e.g. 123"
              value={values["CVC"]}
              name={"CVC"}
              onChange={changeEventHandler}
              isInValid={isCVCInValid}
              errorText={"Can’t be blank"}
            />
          </div>
          <Button
            text={"Confirm"}
            className="w-full h-[53px] bg-DeepViolet text-white font-bold rounded-md"
          />
        </form>
      </div>
    </>
  );
};
export default App;
