import { useContext } from "react";
import NetlifyContext from "../context/NetlifyContext";

export const useNetlifyContext = () => {
  const ctx = useContext(NetlifyContext);
  if (!ctx) {
    throw new Error("useNetlifyContext must be used within an Auth Provider");
  }
  return ctx;
};
