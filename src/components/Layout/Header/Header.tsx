import classes from "./Header.module.css";
import mealsImage from "../../../assets/images/meals.jpg";
import HeaderCartButton from "../HeaderCartButton/HeaderCartButton";

const Header = () => {
  return (
    <>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of food" />
      </div>
    </>
  );
};

export default Header;
