import { FormEvent, ChangeEvent, useState } from "react";
import { InputField } from "./components/InputField";

import ImageCard from "./assets/BG_Card.png";
import Button from "./components/Button";
import DateInputField from "./components/DateInputField";

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
  const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="absolute top-0 w-1/4 h-screen bg-gradient-to-b from-cyan-500 to-violet-500 -z-0"></div>
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
            className={
              'mb-8 w-full h-11 outline-none font-bold cursor-pointer outline-gray-200 hover:outline-purple-500 outline-2 rounded-md pl-4",'
            }
            onChange={changeEventHandler}
          />
          {/* Card Holder Name can not be blank */}
          {/* Wrong format, numbers only */}
          <InputField
            label={"Card Number"}
            type={"number"}
            placeholder="e.g. 1234 5678 9123 0000"
            value={values["cardNumber"]}
            name={"cardNumber"}
            className={
              "mb-8 w-full h-12 outline-none font-bold cursor-pointer outline-gray-200 hover:outline-purple-500 outline-2 rounded-md pl-4"
            }
            onChange={changeEventHandler}
          />
          {/* Can’t be blank */}
          <div className="flex items-start gap-6">
            <DateInputField
              label={"Exp. Date (MM/YY)"}
              MM={values["MM"]}
              YY={values["YY"]}
              onChange={changeEventHandler}
              className="
                        w-24
                        h-11
                        outline-none
                        font-bold 
                        cursor-pointer
                        outline-gray-200
                        hover:outline-purple-500 
                        outline-2 
                        pl-4
                        rounded-md
              "
            />
            <InputField
              label={"CVC"}
              type={"number"}
              placeholder="e.g. 123"
              value={values["CVC"]}
              name={"CVC"}
              className={
                "mb-10 w-full h-11 outline-none font-bold cursor-pointer outline-gray-200 hover:outline-purple-500 outline-2 pl-4 ml-2 rounded-md"
              }
              onChange={changeEventHandler}
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
