import { createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Axios from 'axios'
import { API_URL } from '../api'

const AuthContext = createContext({})

const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState(false)
  const [token, setToken] = useState('')

  const logout = () => {
    Axios.get(`${API_URL}/logout`,
		{
			headers: {Authorization: `Bearer ${token}`},
		})
		.then((response) => {
			console.log(response);
		})
		.catch((error) => {
			console.log(error);
		});

    Cookies.remove('User')
    setAuth(false)
    setToken('')
  }

  useEffect(() => {
    const cookie = Cookies.get('User')

    if (cookie !== undefined){
      const user = JSON.parse(cookie);
      if (user) {
        setAuth(user.auth);
        setToken(user.token);
      }
    }
  })

  return (
    <AuthContext.Provider value={{ auth, token, setAuth, setToken, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider };