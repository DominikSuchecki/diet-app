import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';

const ConfigContext = createContext({});

const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Axios.get("http://localhost/API/Config.php")
      .then((response) => {
        setConfig(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(true);
      });
  }, []);

  const lastConfig = config[config.length - 1];

  return (
    <ConfigContext.Provider value={{ config, isLoading, lastConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export { ConfigContext, ConfigProvider };
