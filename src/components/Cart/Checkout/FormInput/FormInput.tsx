import React from "react";
import classes from "./FormInput.module.css";

type Props = {
  inputIsValid: boolean;
  label: string;
  errorText: string;
  input: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
};

const FormInput = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const controlClasses = `${classes.control} ${
    !props.inputIsValid && classes.invalid
  }`;
  return (
    <div className={controlClasses}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
      {!props.inputIsValid && <p>{props.errorText}</p>}
    </div>
  );
});

export default FormInput;
