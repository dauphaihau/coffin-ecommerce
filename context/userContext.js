import {createContext, useEffect, useReducer, useState} from "react";
import reducer from '../reducers/filterReducer';
import {useAuth} from "./authContext";
import {userService} from "../services/users";

const initialState = {
  users: [],
};

const UsersContext = createContext(initialState);

const UsersProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [users, setUsers] = useState()
  // const {user} = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const res = await userService.getAll();
      setUsers(res.data)
    }
    fetchData();
  }, [])

  const updateSort = (e) => {
    const value = e.value;
    dispatch({type: UPDATE_SORT, payload: value});
  };

  const clearFilters = () => {
    dispatch({type: CLEAR_FILTERS})
  }

  return (
    <UsersContext.Provider value={{users}}>
      {children}
    </UsersContext.Provider>
  );
}

export {UsersProvider, UsersContext};