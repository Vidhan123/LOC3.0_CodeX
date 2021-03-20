import React, { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const [isAuth, setIsAuth] = useState(false);

  const [userData, setUserData] = useState({
    id: "",
    name: "",
    phoneNo: "",
    email: "",
    password: "",
    role: "",
    age: "",
    sex: "",
    specialization: "",
    token: "",

  });

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <GlobalContext.Provider
      value={{
        user: [userData, setUserData],
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
