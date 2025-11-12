import { createContext, useState } from "react";

const NetlifyContext = createContext(null);

export function NetlifyProvider({ children }) {
  const [search, setSearch] = useState("");

  return (
    <NetlifyContext.Provider value={{ search, setSearch }}>
      {children}
    </NetlifyContext.Provider>
  );
}

export default NetlifyContext;
