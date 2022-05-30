import {createContext, useContext, useState, useEffect, FC, Dispatch} from "react";
import Cookie from "cookie-cutter";
import {accountService} from "../services/account";

export interface AuthState {
  user: object,
  setUser: (prevState) => void,
  isAuthorize: boolean,
  setIsAuthorize: (prevState: boolean) => void,
}

interface User {
  _id: string,
  email: string,
  exp: number,
  iat: number,
  name: string,
  numberAllOfItemsInCart: number,
  role: string
}

const defaultValues = {
  user: {},
  setUser: () => {},
};

const AuthContext = createContext<Partial<AuthState>>(defaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: FC = ({children}) => {
  const [user, setUser] = useState<User | null>();
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
