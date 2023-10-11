import React, { createContext, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

import { BASEURL } from "../config/config";

export const AuthContext = createContext({});

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  let token = JSON.parse(result);
  //  console.log(token)
  return token;
}

//Provider Component
export const AuthProvider = ({ children }) => {
  const [authUser, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [errorData, setData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(null);
  const [isLoading, setLoading] = useState(false);

  //Actions
  const signIn = (user) => {
    setLoading(true);
    axios
      .post(`${BASEURL}/api/login`, user)
      .then((res) => {
        console.log(res.data);
        setUser(res.data.user);
        setCount(res.data.count);
        SecureStore.setItemAsync("mytoken", JSON.stringify(res.data.token));
        SecureStore.setItemAsync("user", JSON.stringify(res.data.user));
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err.response.data);
        setData(err.response.data);
        setLoading(false);
        setIsVisible(true);
      });

    //   const params = {
    //     username: "danQZ",
    //     password: "password",
    //   };
    //   fetch(`${BASEURL}/api/login`, {
    //     method: "POST",
    //     headers: new Headers({
    //       Accept: "application/json",
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     }),
    //     body: JSON.stringify(params),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       setUser(data.user);
    //       console.log(data);
    //       SecureStore.setItemAsync("mytoken", JSON.stringify(data.token));
    //       SecureStore.setItemAsync("user", JSON.stringify(data.user));
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
  };

  const signOut = () => {
    setLoading(true);
    SecureStore.getItemAsync("mytoken").then((token) => {
      fetch(`${BASEURL}/api/logout`, {
        method: "POST",
        headers: new Headers({
          Accept: "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          SecureStore.deleteItemAsync("mytoken");
          SecureStore.deleteItemAsync("user");
          setUser("");
          console.log(data.message);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.response);
          setLoading(false);
        });
    });
  };

  const signUp = (user) => {
    //setLoading(true);
    axios
      .post(`${BASEURL}/api/register`, user)
      .then((res) => {
        console.log(res.data);
        setUser(res.data.user);
        SecureStore.setItemAsync("mytoken", JSON.stringify(res.data.token));
        SecureStore.setItemAsync("user", JSON.stringify(res.data.user));
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setData(err.response.data);
        setIsVisible(true);
        // setLoading(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        signIn,
        signUp,
        signOut,
        errorData,
        setData,
        isVisible,
        setIsVisible,
        count,
        setCount,
        isLoading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
