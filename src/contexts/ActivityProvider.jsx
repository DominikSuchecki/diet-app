import React, { useState, useEffect, createContext } from 'react';
import Axios from 'axios';

const ActivityContext = createContext({});

const ActivityProvider = ({ children }) => {
  const [activity, setActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Axios.get('http://localhost/API/Activity.php')
      .then((response) => {
        setIsLoading(false);
        setActivity(response.data);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(true);
      });
  }, []);

  return (
    <ActivityContext.Provider value={{ activity, isLoading }}>
      {children}
    </ActivityContext.Provider>
  );
}

export { ActivityContext, ActivityProvider };
