import React, { createContext, useState } from 'react'
export const UserDataContext = createContext()

export const UserContext = ({children}) => {
    const [user, setuser] = useState({
        email:'',
        fullName:{
            firstName:'',
            lastName:'',
        }
    });

  return (
    <UserDataContext.Provider value={{user, setuser}}>
      {children}
    </UserDataContext.Provider>
  );
};