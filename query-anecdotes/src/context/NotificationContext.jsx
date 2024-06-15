import { createContext, useContext, useReducer } from "react";

export const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "CLEAR":
      return null;
    default:
      return state;
  }
};

const initialState = "";

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(
    notificationReducer,
    initialState
  );

  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const { notification } = useContext(NotificationContext);
  return notification;
};

export const useDispatchNotification = () => {
  const { dispatch } = useContext(NotificationContext);
  const dispatchNotification = (text) => {
    dispatch({
      type: "SET",
      payload: `${text}`,
    });
    setTimeout(() => {
      dispatch({
        type: "CLEAR",
      });
    }, 5000);
  };
  return dispatchNotification;
};
