import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { urlPatterns } from "./components/urls";
import { App } from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <App/>
        <RouterProvider router={urlPatterns} />
    </Provider>
);
