import Cookies from "js-cookie";
export const isAuthenticated = () => {
    const localStorageToken = localStorage.getItem('Admin');
    const loginCookie = Cookies.get("Admin");
  
    return !!localStorageToken || !!loginCookie;
  };
 
  export const requireAuthentication = (router) => {
    if (!isAuthenticated()) {
      router.push('/Admin/signin');
    }
  };
  