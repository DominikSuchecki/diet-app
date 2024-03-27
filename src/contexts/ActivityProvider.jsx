import { useState, useEffect, createContext, useContext } from 'react';
import Axios from 'axios';
import { AuthContext } from './AuthProvider';
import { API_URL } from '../api';

const ActivityContext = createContext({});

const ActivityProvider = ({ children }) => {
  const [activity, setActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [update, setUpdate] = useState(0);

  const { auth, token } = useContext(AuthContext)

    useEffect(() => {
      if(auth){
      Axios.get(`${API_URL}/activity`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => {
          setIsLoading(false);
          setActivity(response.data);
        })
        .catch((error) => {
          setIsLoading(true);
        });
      }
}, [auth, token, update]);

  return (
    <ActivityContext.Provider value={{ activity, isLoading, update, setUpdate }}>
      {children}
    </ActivityContext.Provider>
  );
}

export { ActivityContext, ActivityProvider };
