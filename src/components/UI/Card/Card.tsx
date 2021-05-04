import React from "react";
import classes from "./Card.module.css";
type Props = {
  children: React.ReactNode;
};
const Card = (props: Props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;
