import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [userObject, setUserObject] = useState({});
  const [open, setSideBarOpen] = useState(false);
  const [search, setSearchBar] = useState(false);
  const [results, setResults] = useState("");

  const loggedIn = () => {
    setUser(!user);
  };

  const SideBarToggle = () => {
    setSideBarOpen(!open);
  };

  const SearchBar = () => {
    setSearchBar(!search);
  };

  const value = {
    setUser,
    user,
    loggedIn,
    setUserObject,
    userObject,
    open,
    SideBarToggle,
    SearchBar,
    search,
    results,
    setResults,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
