import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { createOvermind } from "overmind";
import { config } from "./overmind";
import { Provider } from "overmind-react";

const overmind = createOvermind(config);

ReactDOM.render(
  // <React.StrictMode> There are some blueprintjs issues with StrictMode
  <Provider value={overmind}>
    <App />
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
