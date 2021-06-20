import { createContext, useReducer, useEffect } from "react";

// do ta perdorim me vone aty ku duam te marrim
const UserContext = createContext();

//useReducer
const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};
const initialState = {
  user: null,
};
// krijojme funksioni Provider
const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(window.localStorage.getItem("user")),
    });
  }, []);

  // useEffect(() => {
  //   userFromStorage = localStorage.getItem("user")
  //     ? JSON.parse(localStorage.getItem("user"))
  //     : null;
  //   console.log("getItem", userFromStorage);
  // }, []);

  // console.log(user);
  // if (typeof window !== "undefined") {
  //   userFromStorage = localStorage.getItem("user")
  //     ? JSON.parse(localStorage.getItem("user"))
  //     : {};
  //   console.log(userFromStorage);
  // }

  // localStorage
  // per te ruajtur  localStorage.setItem("user")
  // per te marre  localStorage.getItem("user")
  // per te fshire  localStorage.removeItem("user")
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
