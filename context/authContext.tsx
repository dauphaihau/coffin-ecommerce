import {createContext, useContext, useState, useEffect, FC, Dispatch} from "react";
import Cookie from "cookie-cutter";
import {accountService} from "../services/account";

export interface AuthState {
  user: object,
  setUser: (prevState: undefined) => undefined,
}

const defaultValues = {
  user: {},
  setUser: () => null,
};

const AuthContext = createContext<Partial<AuthState>>(defaultValues);
// const AuthContext = createContext(defaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: FC = ({children}) => {
  const [user, setUser] = useState();
  const [isAuthorize, setIsAuthorize] = useState(false)

  useEffect(() => {
    if (Cookie.get("userInfo")) {
      const userInfo = JSON.parse(Cookie.get("userInfo"))

      const verifyAuth = async () => {
        const res = await accountService.me(userInfo);
        if (res.isSuccess) {
          setUser({...(user as object), ...res.data})
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
