// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";

// const AuthContext = React.createContext();
 
// function AuthProviderWrapper(props) {

//   const API_URL = process.env.REACT_APP_SERVER_URL;

//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [user, setUser] = useState(null);
 
//   const storeToken = (token) => {
//     localStorage.setItem('authToken', token);
//   }  
  
//   const authenticateUser = useCallback(() => {         
//     const storedToken = localStorage.getItem('authToken');
    
//     if (storedToken) {
//       axios.get(
//          `${API_URL}/auth/verify`, 
//          { headers: { Authorization: `Bearer ${storedToken}`} }
//        )
//       .then((response) => { 
//         const user = response.data;      
//         setIsLoggedIn(true);
//         setIsLoading(false);
//         setUser(user);        
//       })
//       .catch((error) => {      
//         setIsLoggedIn(false);
//         setIsLoading(false);
//         setUser(null);        
//       })
//     } else {
//         setIsLoggedIn(false);
//         setIsLoading(false);
//         setUser(null);      
//     }   
//   }, [API_URL])
 
//   const logOutUser = () => {                   
//     removeToken();  
//     authenticateUser();
//   }  
  
//   const removeToken = () => {                 
//     localStorage.removeItem("authToken");
//   }
  
//   useEffect(() => {                                         
//     authenticateUser();   
//   }, [authenticateUser]);


//   return (                                                   
//     <AuthContext.Provider 
//       value={{ 
//         isLoggedIn,
//         isLoading,
//         user,
//         storeToken,
//         authenticateUser,
//         logOutUser        
//       }}
//     >
//       {props.children}
//     </AuthContext.Provider>
//   )
// }
 
// export { AuthProviderWrapper, AuthContext };

import React, { useState, useEffect, useCallback, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  const API_URL = process.env.REACT_APP_SERVER_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem('authToken', token);
  };

  const authenticateUser = useCallback(() => {
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      axios.get(`${API_URL}/auth/verify`, { headers: { Authorization: `Bearer ${storedToken}`} })
        .then((response) => {
          const user = response.data;
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
        })
        .catch((error) => {
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  }, [API_URL]);

  const logOutUser = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
  };

  const updateUserProfile = (updatedUserInfo) => {
    setUser(updatedUserInfo);
  };

  useEffect(() => {
    authenticateUser();
  }, [authenticateUser]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
        updateUserProfile
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
