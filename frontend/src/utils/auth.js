export const setAuthToken = (token) => {
    localStorage.setItem("authToken", token);
  };
  
  
  export const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };
  
 
  export const removeAuthToken = () => {
    localStorage.removeItem("authToken");
  };