import { FormEvent, ChangeEvent, useState, FocusEvent } from "react";
import { InputField } from "./components/InputField";

import ImageCard from "./assets/BG_Card.png";
import Button from "./components/Button";
import DateInputField from "./components/DateInputField";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

type fieldValidator = (currentValues: CCForm) => string;

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

  const validateCardholder = (currentValues: CCForm) => {
    const cardHolder = currentValues["cardholderName"].value;
    if (cardHolder.trim().toLowerCase() === "") {
      return "Card Holder Name can not be blank";
    }
    return "";
  };

  const validateCardNumber = (currentValues: CCForm) => {
    const cardNumber = currentValues["cardNumber"].value;

    if (cardNumber.trim().toLowerCase() === "") {
      return "Card Number can not be blank";
    }

    if (isNaN(Number(cardNumber))) {
      return "Wrong format, numbers only";
    }
    return "";
  };

  const validateMY = (currentValues: CCForm) => {
    const MM = currentValues["MM"].value;
    const YY = currentValues["YY"].value;
    if (MM.trim().toLowerCase() === "") {
      return "MM Can’t be blank";
    } else if (YY.trim().toLowerCase() === "") {
      return "YY Can’t be blank";
    }
    return "";
  };

  const validateCVC = (currentValues: CCForm) => {
    const CVC = currentValues["CVC"].value;
    if (CVC.trim().toLowerCase() === "") {
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
    if (
      values["cardholderName"].value.trim() === "" ||
      values["cardNumber"].value.trim() === "" ||
      values["MM"].value.trim() === "" ||
      values["YY"].value.trim() === "" ||
      values["CVC"].value.trim() === ""
    )
      return;

    setisLoading(true);
    setisSuccessful(false);

    setTimeout(() => {
      setisLoading(false);
      setisSuccessful(true);
    }, 2000);
    const newValues = Object.keys(values).reduce((accumulator, key) => {
      return { ...accumulator, [key]: values[key as keyof CCForm].value };
    }, {});
    setValues(newValues as CCForm);
  };

  const onChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((currentValues) => ({
      ...currentValues,
      [e.target.name]: {
        ...(values[e.target.name as keyof CCForm] as FieldConfig),
        value: e.target.value,
        error: (values[e.target.name as keyof CCForm] as FieldConfig).validator(
          currentValues
        ),
      },
    }));
  };

  //Questions
  //1. currentValues?

  const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
    setValues((currentValues) => ({
      ...currentValues,
      [e.target.name]: {
        ...(currentValues[e.target.name as keyof CCForm] as FieldConfig),
        error: (
          currentValues[e.target.name as keyof CCForm] as FieldConfig
        ).validator(currentValues),
      },
    }));
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
              onChange={onChangeEventHandler}
              onBlur={onBlurHandler}
              isInValid={values["cardholderName"].error !== ""}
              errorText={values["cardholderName"].error}
            />
            <InputField
              label={"Card Number"}
              type={"text"}
              placeholder="e.g. 1234 5678 9123 0000"
              value={values["cardNumber"].value}
              name={"cardNumber"}
              onChange={onChangeEventHandler}
              onBlur={onBlurHandler}
              isInValid={values["cardNumber"].error !== ""}
              errorText={values["cardNumber"].error}
            />
            <div className="flex items-start gap-6">
              <DateInputField
                label={"Exp. Date (MM/YY)"}
                MM={values["MM"].value}
                YY={values["YY"].value}
                onChange={onChangeEventHandler}
                onBlur={onBlurHandler}
                isInValidMM={values["MM"].error !== ""}
                isInValidYY={values["YY"].error !== ""}
                errorText={"MM or YY can not be empty"}
              />
              <InputField
                label={"CVC"}
                type={"number"}
                placeholder="e.g. 123"
                value={values["CVC"].value}
                name={"CVC"}
                onChange={onChangeEventHandler}
                onBlur={onBlurHandler}
                isInValid={values["CVC"].error !== ""}
                errorText={values["CVC"].error}
              />
            </div>
            <Button
              text={"Confirm"}
              className="w-full mt-4 h-[53px] bg-DeepViolet text-white font-bold rounded-md"
            />
          </form>
        )}
      </div>
    </>
  );
};
export default App;
