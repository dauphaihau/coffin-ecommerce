import {createContext, useContext, useState, useEffect, FC} from "react";
import {parseCookies} from "nookies";

import {accountService} from "../services/account";
import {hashMD5} from "../utils/helpers";
import config from "../config.json";

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
  setUser: () => {
  },
};

const AuthContext = createContext<Partial<AuthState>>(defaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: FC = ({children}) => {
  const [user, setUser] = useState<User | null>();
  const [isAuthorize, setIsAuthorize] = useState(false)

  useEffect(() => {
    const cookies = parseCookies();
    if (cookies[hashMD5(config.cookies.auth)]) {
      const verifyAuth = async () => {
        const {isSuccess, data} = await accountService.me();
        if (isSuccess) {
          setUser({...(user as object), ...data})
          setIsAuthorize(true)
        } else {
          setIsAuthorize(false)
        }
      }
      verifyAuth();
    } else {
      setIsAuthorize(false)
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
