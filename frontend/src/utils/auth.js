export const setAuthToken = (token) => {
    localStorage.setItem("authToken", token);
  };
  
  // Get token
  export const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };
  
  // Remove token
  export const removeAuthToken = () => {
    localStorage.removeItem("authToken");
  };