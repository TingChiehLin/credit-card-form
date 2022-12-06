import { FormEvent, ChangeEvent, useState, FocusEvent } from "react";
import { InputField } from "./components/InputField";

import ImageCard from "./assets/BG_Card.png";
import Button from "./components/Button";
import DateInputField from "./components/DateInputField";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SuccessImg from "./assets/success.png";

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

  const validateM = (currentValues: CCForm) => {
    const MM = currentValues["MM"].value;
    const YY = currentValues["YY"].value;

    const isMonthEmpty = MM.trim().toLowerCase() === "";
    const isYearEmpty = YY.trim().toLowerCase() === "";

    if (isMonthEmpty && isYearEmpty) {
      return "MM and YY Can’t be blank";
    }

    if (isMonthEmpty) {
      return "MM Can’t be blank";
    }
    return "";
  };

  const validateY = (currentValues: CCForm) => {
    const MM = currentValues["MM"].value;
    const YY = currentValues["YY"].value;

    const isMonthEmpty = MM.trim().toLowerCase() === "";
    const isYearEmpty = YY.trim().toLowerCase() === "";

    if (isMonthEmpty && isYearEmpty) {
      return "MM and YY Can’t be blank";
    }

    if (isYearEmpty) {
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
      validator: validateM,
    },
    YY: {
      value: "",
      error: "",
      validator: validateY,
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

    const newValues = Object.keys(values).reduce((accumulator, key) => {
      return {
        ...accumulator,
        [key]: {
          value: "",
          error: "",
          validator: values[key as keyof CCForm].validator,
        },
      };
    }, {});

    setValues(newValues as CCForm);

    setTimeout(() => {
      setisLoading(false);
      setisSuccessful(true);
    }, 2000);
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
      <div className="flex justify-center items-center gap-28 absolute top-1/2 -translate-y-1/2 left-[12%] z-10">
        <img className="" alt="bg-card" src={ImageCard} />
        {isSuccessful ? (
          <div className="flex flex-col items-center gap-6">
            <img src={SuccessImg} alt={"successImg"} width={"96rem"} />
            <h1 className="text-[28px] font-bold">THANK YOU!</h1>
            <div className="text-[18px] font-semibold text-[#8F8694]">
              We’ve added your card details
            </div>

            <Button
              text="Continue"
              onClick={() => setisSuccessful(false)}
              className="w-full mt-4 h-[53px] bg-DeepViolet text-white font-bold rounded-md"
            />
          </div>
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
                errorText={
                  values["MM"].error !== ""
                    ? values["MM"].error
                    : values["YY"].error
                }
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
