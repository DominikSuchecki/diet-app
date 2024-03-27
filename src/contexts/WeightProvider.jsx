import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthProvider';
import Axios from 'axios';
import { API_URL } from '../api';

const WeightContext = createContext({});

const WeightProvider = ({ children }) => {

	const { auth, token } = useContext(AuthContext)
  const [weight, setWeight] = useState([]);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    if(auth){
      Axios.get(`${API_URL}/weight`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      setWeight(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
    }
  }, [auth, token, update]);

  let lastWeight = weight[weight.length-1]?.weight;

  return (
    <WeightContext.Provider value={{ weight, lastWeight, update, setUpdate}}>
      {children}
    </WeightContext.Provider>
  );
};

export { WeightContext, WeightProvider};
