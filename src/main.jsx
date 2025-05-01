// main.jsx or index.js (depending on your project setup)

import React from "react";
import ReactDOM from "react-dom/client";  // Import the `react-dom/client` for React 18
import { BrowserRouter } from "react-router-dom";  // Import BrowserRouter

import App from "./App";  // Your main App component

// Create a root element using ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app with the root element inside BrowserRouter
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
