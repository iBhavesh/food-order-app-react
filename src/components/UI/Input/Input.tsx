import React from "react";
import classes from "./Input.module.css";

type Props = {
  label: string;
  input: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
};

const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => (
  <div className={classes.input}>
    <label htmlFor={props.input.id}>{props.label}</label>
    <input {...props.input} ref={ref} />
  </div>
));

export default Input;
