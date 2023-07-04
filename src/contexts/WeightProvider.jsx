import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';

const WeightContext = createContext({});

const WeightProvider = ({ children }) => {
  const [weight, setWeight] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost/API/Weight.php")
      .then((response) => {
        setWeight(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <WeightContext.Provider value={{ weight }}>
      {children}
    </WeightContext.Provider>
  );
};

export { WeightContext, WeightProvider };
