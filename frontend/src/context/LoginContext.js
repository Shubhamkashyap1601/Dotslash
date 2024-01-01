import { createContext, useContext } from "react";

const LoginContext = createContext({
  isLoggedIn:true,
  LogIn: () => {},
  LogOut: () => {},
  username : "Guest",
  setUsername : ()=>{}
});


const LoginContextProvider = LoginContext.Provider;

function useLoginContext(){
  return useContext(LoginContext);
};

export { LoginContext, LoginContextProvider, useLoginContext};
