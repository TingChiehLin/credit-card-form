import { FormEvent, useState } from "react";
import { InputField } from "./components/InputFueld";

import ImageCard from "./assets/BG_Card.png";

const App = () => {
  const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          <InputField
            labelTitle="Cardholder Name"
            InputType="text"
            placeholderText="e.g. Jane Appleseed"
            InputValue=""
            Inputname="Cardholder Name"
            className="mb-6 w-full h-11 outline-none font-bold cursor-pointer outline-gray-200 hover:outline-purple-500 outline-2 rounded-md pl-4"
          />
          <InputField
            labelTitle="Card Number"
            InputType="number"
            placeholderText="e.g. 1234 5678 9123 0000"
            InputValue=""
            Inputname="Card Number"
            className="mb-6 w-full h-11 outline-none font-bold cursor-pointer outline-gray-200 hover:outline-purple-500 outline-2 rounded-md pl-4"
          />
          <div className="flex flex-col">
            <h3 className="mb-2">Exp. Date (MM/YY)</h3>
            <div className="flex items-center gap-2">
              <InputField
                labelTitle=""
                InputType="number"
                placeholderText="MM"
                InputValue=""
                Inputname="Card Number"
                className="mb-6 w-16 h-11 outline-none font-bold cursor-pointer outline-gray-200 hover:outline-purple-500 outline-2 rounded-md pl-4"
              />
              <InputField
                InputType="number"
                placeholderText="YY"
                InputValue=""
                Inputname="Card Number"
                className="mb-6 w-16 h-11 outline-none font-bold cursor-pointer outline-gray-200 hover:outline-purple-500 outline-2 rounded-md pl-4 ml-2"
              />
            </div>
          </div>
          <InputField
            labelTitle="CVC"
            InputType="number"
            placeholderText="e.g. 123"
            InputValue=""
            Inputname="Card Number"
            className="mb-10 w-full h-11 outline-none font-bold cursor-pointer outline-gray-200 hover:outline-purple-500 outline-2 pl-4"
          />
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
