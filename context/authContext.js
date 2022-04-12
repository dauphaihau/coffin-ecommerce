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
    authCheck();
  }, []);

  const authCheck = async () => {

    try {
      let userInfo = Cookie.get("userInfo");
      if (userInfo) {
        userInfo = JSON.parse(userInfo)
        setUser({...user, ...userInfo})
      }

      // const res = await accountService.me(userInfo);
      // console.log('res', res)
      // if (res) {
      //   setUser({...user, ...res})
      //   setIsAuthorize(true)
      // }

      if (userInfo) {
        setUser({...user, ...userInfo})
        setIsAuthorize(true)
      }
    } catch (err) {
      setIsAuthorize(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{user, setUser, isAuthorize, setIsAuthorize}}
    >
      {children}
    </AuthContext.Provider>
  );
}
