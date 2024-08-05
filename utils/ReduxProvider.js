'use client'
import { Provider } from "react-redux";
import { store } from "../stores/index"; // Adjust the import path as needed

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}