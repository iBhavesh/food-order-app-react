import { useEffect, useState } from "react";

import classes from "./AvailableMeals.module.css";
import Meal from "../../../model/meal";
import MealItem from "./MealItem/MealItem";
import Card from "../../UI/Card/Card";
import useHttp from "../../../hooks/useHttp";

const AvailableMeals = () => {
  const [MEALS, setMEALS] = useState<Meal[]>([]);
  const { isLoading, httpError, sendRequest } = useHttp();

  useEffect(() => {
    const postRequest = (data: any) => {
      let loadedMeals: Meal[] = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: +data[key].price,
        });
      }
      setMEALS(loadedMeals);
    };

    sendRequest(
      process.env.REACT_APP_FIREBASE_URL + "meals.json",
      {},
      postRequest
    );
  }, [sendRequest]);
  if (isLoading) {
    return (
      <section className={classes["meals-loading"]}>
        <Card>
          <h2>Loading...</h2>
        </Card>
      </section>
    );
  } else if (httpError) {
    return (
      <section className={classes["meals-error"]}>
        <Card>
          <h2>{httpError}</h2>
        </Card>
      </section>
    );
  }

  const mealsList = MEALS.map((meal) => <MealItem key={meal.id} meal={meal} />);
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
