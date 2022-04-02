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

  const router = useRouter()
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    console.log('router-as-path', router.asPath)
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ['/account/login'];
    const path = url.split('?')[0];
    if (!userService.userValue && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/',
        // query: { returnUrl: router.asPath } // ?
      });
    } else {
      setAuthorized(true);
    }
  }

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {authorized && children}
    </AuthContext.Provider>
  );
}
