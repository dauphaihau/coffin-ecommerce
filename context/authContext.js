import {createContext, useContext, useState, useEffect} from "react";
import {useRouter} from "next/router";
import {userService} from "../services";

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

  const router = useRouter()

  useEffect(() => {
    authCheck(router.asPath);
  }, []);

  function authCheck(url) {
    const publicPaths = ['/account'];
    const path = url.split('?')[0];
    if (!userService.userValue && !publicPaths.includes(path)) {
      router.push('/');

    } else {
      setIsAuthorize(true)
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
