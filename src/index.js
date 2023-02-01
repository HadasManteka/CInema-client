import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import UserContext from './components/context/UserContext';

ReactDOM.render(<UserContext><App /></UserContext>, document.getElementById("root"));
