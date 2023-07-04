import React, { createContext, useEffect, useState } from 'react';
import Axios from 'axios';

const DietContext = createContext({});

const DietProvider = ({ children }) => {
  const [diet, setDiet] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Axios.get('http://localhost/API/Diet.php')
      .then((response) => {
        setIsLoading(false);
        setDiet(response.data);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(true);
      });
  }, []);

  return (
    <DietContext.Provider value={{ diet, isLoading }}>
      {children}
    </DietContext.Provider>
  );
};

export { DietContext, DietProvider };
