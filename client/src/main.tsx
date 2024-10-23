import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.tsx";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <Toaster position="top-center" />
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
