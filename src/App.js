import React from "react";
import Root from "./components/root/root.js";
import Form from "./components/form/form";
import Home from "./components/Home/Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {index: true, element: <Home />},
      {path: 'form', element: <Form/>}
    ]
}
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
