import React, { createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie';

const AuthContext = createContext({})

const AuthProvider = ({ children }) => {

  const [id, setId] = useState(null)
  const [user, setUser] = useState('')
  const [role, setRole] = useState('')
  const [auth, setAuth] = useState(false)

  const logout = () => {
    setId(0)
    setUser('')
    setRole('')
    setAuth(false)
    Cookies.remove('userData')
  }

  useEffect(() => {
    const userData = Cookies.get('userData')
    if(userData){
      setId(userData.id)
      setUser(userData.user)
      setRole(userData.role)
      setAuth(true)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ id, role, auth, user, setId, setRole, setUser, setAuth, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
