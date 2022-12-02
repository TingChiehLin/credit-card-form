import { FormEvent, ChangeEvent, useState, FocusEvent } from "react";
import { InputField } from "./components/InputField";

import ImageCard from "./assets/BG_Card.png";
import Button from "./components/Button";
import DateInputField from "./components/DateInputField";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

type fieldValidator = () => string;

interface FieldConfig {
  value: string;
  error: string;
  validator: fieldValidator;
}

interface CCForm {
  cardholderName: FieldConfig;
  cardNumber: FieldConfig;
  MM: FieldConfig;
  YY: FieldConfig;
  CVC: FieldConfig;
}

const App = () => {
  const [isSuccessful, setisSuccessful] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);

  const validateCardholder = () => {
    const cardHolder = values["cardholderName"].value;
    if (cardHolder.trim() === "") {
      return "Card Holder Name can not be blank";
    }
    return "";
  };

  const validateCardNumber = () => {
    const cardNumber = values["cardNumber"].value;

    if (cardNumber.trim() === "") {
      return "Card Number can not be blank";
    }

    if (isNaN(Number(cardNumber))) {
      return "Wrong format, numbers only";
    }
    return "";
  };

  const validateMY = () => {
    const MM = values["MM"].value;
    const YY = values["YY"].value;
    if (MM.trim() === "") {
      return "Can’t be blank";
    }

    if (YY.trim() === "") {
      return "Can’t be blank";
    }
    return "";
  };

  const validateCVC = () => {
    const CVC = values["CVC"].value;
    if (CVC.trim() === "") {
      return "Can’t be blank";
    }
    return "";
  };

  const [values, setValues] = useState<CCForm>({
    cardholderName: {
      value: "",
      error: "",
      validator: validateCardholder,
    },
    cardNumber: {
      value: "",
      error: "",
      validator: validateCardNumber,
    },
    MM: {
      value: "",
      error: "",
      validator: validateMY,
    },
    YY: {
      value: "",
      error: "",
      validator: validateMY,
    },
    CVC: {
      value: "",
      error: "",
      validator: validateCVC,
    },
  });

  const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setisLoading(true);
    setisSuccessful(false);

    setTimeout(() => {
      setisLoading(false);
      setisSuccessful(true);
    }, 2000);

    if (
      values["cardholderName"].error.length === 0 &&
      values["cardNumber"].error.length === 0 &&
      values["MM"].error.length === 0 &&
      values["YY"].error.length === 0 &&
      values["CVC"].error.length === 0
    ) {
      setisSuccessful(true);
      setisLoading(false);
      const newValues = Object.keys(values).reduce((accumulator, key) => {
        return { ...accumulator, [key]: values[key as keyof CCForm].value };
      }, {});
      setValues(newValues as CCForm);

      console.log("Values:", values);
    }
  };

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: {
        ...(values[e.target.name as keyof CCForm] as FieldConfig),
        value: e.target.value,
      },
    });
  };

  const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: {
        ...(values[e.target.name as keyof CCForm] as FieldConfig),
        error: (values[e.target.name as keyof CCForm] as FieldConfig).validator,
      },
    });
  };

  const closeLoadingHandler = () => {
    setisLoading(false);
  };

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
        {isSuccessful ? (
          <div>Succeffful</div>
        ) : (
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
              value={values["cardholderName"].value}
              name={"cardholderName"}
              onChange={changeEventHandler}
              onBlur={onBlurHandler}
              isInValid={validateCardholder() !== ""}
              errorText={validateCardholder()}
            />
            <InputField
              label={"Card Number"}
              type={"text"}
              placeholder="e.g. 1234 5678 9123 0000"
              value={values["cardNumber"].value}
              name={"cardNumber"}
              onChange={changeEventHandler}
              onBlur={onBlurHandler}
              isInValid={validateCardNumber() !== ""}
              errorText={validateCardNumber()}
            />
            <div className="flex items-start gap-6">
              <DateInputField
                label={"Exp. Date (MM/YY)"}
                MM={values["MM"].value}
                YY={values["YY"].value}
                onChange={changeEventHandler}
                onBlur={onBlurHandler}
                isInValidMM={validateMY() !== ""}
                isInValidYY={validateMY() !== ""}
                errorText={validateMY()}
              />
              <InputField
                label={"CVC"}
                type={"number"}
                placeholder="e.g. 123"
                value={values["CVC"].value}
                name={"CVC"}
                onChange={changeEventHandler}
                onBlur={onBlurHandler}
                isInValid={validateCVC() !== ""}
                errorText={validateCVC()}
              />
            </div>
            <Button
              text={"Confirm"}
              className="w-full h-[53px] bg-DeepViolet text-white font-bold rounded-md"
            />
          </form>
        )}
      </div>
    </>
  );
};
export default App;
