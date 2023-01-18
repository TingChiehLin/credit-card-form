import { act, render, screen } from "@testing-library/react";

//import userEvent from "@testing-library/user-event";
//import React, { useState } from "react";

//import Button from "../components/Button";
import App from "../App";
//import { InputField } from "../components/InputField";

describe("Render form component", () => {
  it("should App render correctly", () => {
    const view = render(<App />);
    expect(view).toBeTruthy();
  });

  it("should no any errors wehn the app loading the page", () => {
    render(<App />);
    expect(screen.queryByTestId("cardholderName-error")).toBeNull();
    expect(screen.queryByTestId("cardNumber-error")).toBeNull();
    expect(screen.queryByTestId("MM-error")).toBeNull();
    expect(screen.queryByTestId("YY-error")).toBeNull();
    expect(screen.queryByTestId("CVC-error")).toBeNull();
  });
  //query=> return null, if it does not exist
  //getByTestId => throw errors, if it does not exist
  it("should render 'Card Holder Name can not be blank' error if Cardholder Name is empty", () => {
    const errorText = "Card Holder Name can not be blank";
    render(<App />);
    const cardHolderInput = screen.getByTestId("cardholderName-input");
    act(() => {
      cardHolderInput.focus();
      cardHolderInput.blur();
    });
    expect(screen.getByTestId("cardholderName-error")).toHaveTextContent(
      errorText
    );

    /*
<InputField
        label={"Cardholder Name"}
        type={"text"}
        placeholder="e.g. Jane Appleseed"
        value={""}
        name={"cardholderName"}
        onChange={() => {}}
        onBlur={() => {}}
        isInValid={true}
        errorText={errorText}
      />
    */
    /* const outputElement = screen.getByText(
      'Card Holder Name can not be blank"',
      { exact: false }
    );
    expect(errorText).toBeInTheDocument();
    */
    //  toHaveTextContent

    //const buttonElement = screen.getByRole("button");
  });

  it("should have an error when it does not fill in right information", () => {
    const errorText = "Card Number can not be blank";
    render(<App />);
    //const buttonElement = screen.getAllByRole("button");
  });

  it("should see successful page when every field pass", () => {
    const successfulText = "THANK YOU!";
    //setisSuccessful(false);
    //expect(successfulText).toBeInTheDocument();
  });
});
