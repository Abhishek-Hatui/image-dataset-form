import React from "react";
import Form from "./components/form/form";
import Home from "./components/Home/Home";
import { useState } from "react";

function App() {
  const [show,setShow] =useState(true);

  const clickHandler = (event) => {
    event.preventDefault();

    setShow(false);
  }

  return (
      show ? <Home click = {clickHandler}/> : <Form />
    
  );
}

export default App;
