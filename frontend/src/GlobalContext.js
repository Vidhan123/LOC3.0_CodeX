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

  const getLS = async () => {
    const data = await window.sessionStorage.getItem('LOC_user');
    const jsonData = await JSON.parse(data);
    console.log(jsonData);

    if(jsonData){
      setUserData(jsonData);
    }
  };

  const setLS = async () => {
    await window.sessionStorage.setItem('LOC_user', JSON.stringify(userData));
  };

  useEffect(() => {
    getLS();
  }, []);

  useEffect(() => {
    setLS();
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
