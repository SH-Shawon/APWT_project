import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const Signout = () => {
  const router = useRouter();

  useEffect(() => {
    // Perform sign-out actions, such as clearing cookies and local storage
    Cookies.remove('Admin');
    localStorage.removeItem('Admin');

    // Redirect to the login page or any other page after sign-out
    router.push('/Admin/signin');
  }, []);

  return <p>Signing out...</p>;
};

export default Signout;
