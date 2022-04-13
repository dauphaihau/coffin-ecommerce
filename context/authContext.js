import {createContext, useContext, useState, useEffect} from "react";
import Cookie from "cookie-cutter";
import {accountService} from "../services/account";

const defaultValues = {
  user: {},
  setUser: () => null,
};

const AuthContext = createContext(defaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({children}) {
  const [user, setUser] = useState({});
  const [isAuthorize, setIsAuthorize] = useState(false)

  useEffect(() => {
    if (Cookie.get("userInfo")) {
      const userInfo = JSON.parse(Cookie.get("userInfo"))

      const verifyAuth = async () => {
        const res = await accountService.me(userInfo);
        if (res.isSuccess) {
          setUser({...user, ...res.data})
          setIsAuthorize(true)
        } else {
          setIsAuthorize(false)
        }
      }
      verifyAuth();
    }
  }, []);


  return (
    <AuthContext.Provider
      value={{user, setUser, isAuthorize, setIsAuthorize}}
    >
      {children}
    </AuthContext.Provider>
  );
}
