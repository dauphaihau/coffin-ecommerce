import {createContext, useEffect, useReducer, useState} from "react";
import reducer from '../reducers/filterReducer';
import {userService} from "../services/users";

const initialState = {
  users: [],
};

const UsersContext = createContext(initialState);

const UsersProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [users, setUsers] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const res = await userService.getAll();
      setUsers(res.data)
    }
    fetchData();
  }, [])


  return (
    <UsersContext.Provider value={{users}}>
      {children}
    </UsersContext.Provider>
  );
}

export {UsersProvider, UsersContext};