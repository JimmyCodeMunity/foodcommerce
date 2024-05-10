import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "@coreui/coreui/dist/css/coreui.min.css";
import reportWebVitals from "./reportWebVitals";
import { HelmetProvider } from "react-helmet-async";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "./features/User";

const store = configureStore({
  reducer: {
    shiftId: userReducer,
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/service-worker.js")
//     .then((registration) => {
//       console.log("Service Worker registered with scope:", registration.scope);
//     })
//     .catch((error) => {
//       console.error("Service Worker registration failed:", error);
//     });
// }

root.render(
  <HelmetProvider>
    <Suspense>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </Suspense>
  </HelmetProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
