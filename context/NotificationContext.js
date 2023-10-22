import React, { useReducer, createContext } from "react";
import filterReducer from "./filterReducer";

//Initial State
const initialState = {};

export const FilterContext = createContext();

//Provider Component
export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  //Actions
  // Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Original Title",
      body: "And here is the body!",
      data: { someData: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  return (
    <NotificationContext.Provider
      value={{ filters: state.filters, sendPushNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
