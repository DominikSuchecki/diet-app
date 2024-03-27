import { useContext, createContext, useState, useEffect } from 'react';
import Axios from 'axios';
import { AuthContext } from './AuthProvider';
import { API_URL } from '../api';

const ConfigContext = createContext({});

const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [update, setUpdate] = useState(0);

  const { auth, token } = useContext(AuthContext)

  useEffect(() => {
    if(auth){
    Axios.get(`${API_URL}/config`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      setConfig(response.data);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setIsLoading(true);
    });
  }
  }, [auth, token, update]);  

  const lastConfig = config[config.length - 1];

  return (
    <ConfigContext.Provider value={{ config, isLoading, lastConfig, update, setUpdate }}>
      {children}
    </ConfigContext.Provider>
  );
};

export { ConfigContext, ConfigProvider };
