// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
// import Barang from "./components/Barang";
import App from './App';

ReactDOM.render(
    <Provider store={store}>
        {/* <Barang /> */}
        <App />
    </Provider>,
    document.getElementById("root")
);
