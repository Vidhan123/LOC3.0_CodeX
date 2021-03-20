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

  const [allDoctors, setAllDoctors] = useState([]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  useEffect(() => {
    console.log(allDoctors);
  }, [allDoctors]);

  return (
    <GlobalContext.Provider
      value={{
        user: [userData, setUserData],
        allDocs: [allDoctors, setAllDoctors],
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
