import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header/Header";
import Meals from "./components/Meals/Meals";

function App() {
  const [showModal, setShowModal] = useState(true);
  const closeModal = () => {
    setShowModal(false);
  };

  const displayModal = () => {
    setShowModal(true);
  };

  return (
    <>
      {showModal && <Cart onClose={closeModal} />}
      <Header onShowCart={displayModal} />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
