import { createContext, useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import { AuthContext } from './AuthProvider';
import { API_URL } from '../api';

const DietContext = createContext({});

const DietProvider = ({ children }) => {
  const [diet, setDiet] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { auth, token } = useContext(AuthContext)
  const [update, setUpdate] = useState(0);
  
    useEffect(() => {
      if(auth){
      Axios.get(`${API_URL}/diet`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => {
          setIsLoading(false);
          setDiet(response.data);
        })
        .catch((error) => {
          setIsLoading(true);
        });
      }
    }, [auth, token, update]);

  return (
    <DietContext.Provider value={{ diet, isLoading, update, setUpdate }}>
      {children}
    </DietContext.Provider>
  );
};

export { DietContext, DietProvider };
