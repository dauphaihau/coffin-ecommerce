import {createContext, useContext, useState, useEffect} from "react";
import {useRouter} from "next/router";
import Cookie from "cookie-cutter";
import axios from "axios";

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
    authCheck();
  }, [router.asPath]);


  const authCheck = async () => {

    const privatePaths = [`/account${router.asPath.slice(8)}`];
    const path = router.asPath.split('?')[0];
    if (privatePaths.includes(path)) {
      if (!isAuthorize) {
        return router.push('/');
      }
    } else {
      return ''
    }

    try {
      let userInfo = Cookie.get("userInfo");
      if (userInfo) {
        userInfo = JSON.parse(userInfo)
      }
      const {data} = await axios.get(
        '/api/users/me',
        {headers: {authorization: `Bearer ${userInfo.token}`}}
      );
      if (data) {
        setUser({...user, ...data})
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
