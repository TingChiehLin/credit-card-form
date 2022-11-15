import { FormEvent, ChangeEvent, useState } from "react";
import { InputField } from "./components/InputFueld";

import { inputData } from "./data";
import ImageCard from "./assets/BG_Card.png";

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
        >
          {inputData.map((e, index) => (
            <InputField
              key={e.id}
              label={e.label}
              type={e.type}
              placeholder={e.placeholder}
              value={values[e.name as keyof CCForm]}
              name={e.name}
              className={e.className}
              onChange={changeEventHandler}
            />
          ))}
          <button
            type="submit"
            className="w-full h-[53px] bg-DeepViolet text-white font-bold rounded-md"
          >
            Confirm
          </button>
        </form>
      </div>
    </>
  );
};
export default App;
