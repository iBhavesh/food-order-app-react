import { useRef, useState } from "react";
import UserData from "../../../model/userData";
import classes from "./Checkout.module.css";
import FormInput from "./FormInput/FormInput";

type Props = {
  onCancel: () => void;
  onConfirm: (userData: UserData) => void;
  httpError: string | null;
  isLoading: boolean;
};

const isNotEmpty = (value: string) => value.trim() !== "";
const isValidPostal = (value: string) => value.length >= 5 && value.length <= 6;

const Checkout = (props: Props) => {
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const streetInputRef = useRef<HTMLInputElement | null>(null);
  const postalInputRef = useRef<HTMLInputElement | null>(null);
  const cityInputRef = useRef<HTMLInputElement | null>(null);

  const [nameInputIsValid, setNameInputIsValid] = useState(true);
  const [streetInputIsValid, setStreetInputIsValid] = useState(true);
  const [cityInputIsValid, setCityInputIsValid] = useState(true);
  const [postalInputIsValid, setPostalInputIsValid] = useState(true);

  const confirmHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current!.value;
    const enteredStreet = streetInputRef.current!.value;
    const enteredPostal = postalInputRef.current!.value;
    const enteredCity = cityInputRef.current!.value;

    const enteredNameIsValid = isNotEmpty(enteredName);
    const enteredStreetIsValid = isNotEmpty(enteredStreet);
    const enteredCityIsValid = isNotEmpty(enteredCity);
    const enteredPostalIsValid = isValidPostal(enteredPostal);

    setNameInputIsValid(enteredNameIsValid);
    setCityInputIsValid(enteredCityIsValid);
    setPostalInputIsValid(enteredPostalIsValid);
    setStreetInputIsValid(enteredStreetIsValid);

    const formIsValid =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostal,
    });
  };
  let actions = (
    <div className={classes.actions}>
      <button type="button" onClick={props.onCancel}>
        Cancel
      </button>
      <button className={classes.submit}>Confirm</button>
    </div>
  );
  if (props.httpError) {
    actions = (
      <>
        <h2 style={{ color: "red" }}>Ooops! Something went wrong.</h2>
        <div className={classes.actions}>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
        </div>
      </>
    );
  } else if (props.isLoading) {
    actions = <h2>Placind order..</h2>;
  }
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <FormInput
        inputIsValid={nameInputIsValid}
        ref={nameInputRef}
        label="Your Name"
        errorText="Please enter a valid name!"
        input={{
          type: "text",
          id: "name",
        }}
      />
      <FormInput
        inputIsValid={streetInputIsValid}
        ref={streetInputRef}
        label="Street"
        errorText="Please enter a valid street!"
        input={{
          type: "text",
          id: "street",
        }}
      />
      <FormInput
        inputIsValid={postalInputIsValid}
        ref={postalInputRef}
        label="Postal Code"
        errorText="Please enter a valid postal code(5 to 6 characters long)!"
        input={{
          type: "text",
          id: "postal",
        }}
      />
      <FormInput
        inputIsValid={cityInputIsValid}
        ref={cityInputRef}
        label="City"
        errorText="Please enter a valid city!"
        input={{
          type: "text",
          id: "city",
        }}
      />
      {actions}
    </form>
  );
};

export default Checkout;
