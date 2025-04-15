/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      // action.payload = {name, email, password}
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return initialState;
    default:
      throw new Error("Unknown action!");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside of the AuthProdiver");
  return context;
}

export { AuthProvider, useAuth };
