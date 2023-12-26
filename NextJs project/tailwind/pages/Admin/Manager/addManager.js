import React ,{ useState,useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Home from '@/pages/component/navbar';
import Cookies from "js-cookie";
import { requireAuthentication } from '@/pages/component/auth';

export default function SignUpForm() {
  const router = useRouter();
  useEffect(() => {
    requireAuthentication(router);
  }, []);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [managerId, setManagerId] = useState('');
  const [password, setPassword] = useState('');
 
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [idError, setManagerIdError] = useState('');
  const [nameError, setNameError] = useState('');
  const adminId = Cookies.get("Admin");
 console.log("admin is"+ adminId);
 //alert(adminId);
  

  const handleChangeName = (e) => {
    setName(e.target.value);
    setNameError('');
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handleChangeId = (e) => {
    setManagerId(e.target.value);
    setManagerIdError('');
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };
  

  const handleSubmit = async (e) => {
    setError('');

    e.preventDefault();

    // Perform form validation
    if (!name || !email || !managerId || !password ) {
      setError('All fields are required');
    } else if (!isValidName(name)) {
      setNameError('Name length should be at least 6');
    } else if (!isValidEmail(email)) {
      setEmailError('Invalid email address');
    }else if (!isValidPassword(password)) {
      setPasswordError('Password must be at least 6 characters long and a combination of upper and lower case');
    } else if (!isValidId(managerId)) {
      setManagerIdError('Invalid Id number');
    } else {
      try {

        const response = await axios.post(`http://localhost:3000/admin/addManager/${adminId}`, {
          managerId: managerId,
          name: name,
          gmail: email,
          password: password,  
      });

        if (response.data && !response.data.message) {
          router.push(`/Admin/Manager/${managerId}`);
          // Account created successfully
         // router.push('signin');
        } else {
          // Handle account creation failure
          setError(response.data.message || 'Account creation failed');
        }
      } catch (error) {
        console.error(error);
        setError('Something went wrong');
      }
    }
  };

  const isValidName = (name) => {
    const validName = /^.{6,}$/;
    return validName.test(name);
  };

  const isValidEmail = (email) => {
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(email);
  };

  const isValidId = (id) => {
    // Allow any character in the ID
    const idPattern = /^.*$/;
    return idPattern.test(id);
  };
  
  const isValidPassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordPattern.test(password);
  };
  

  return (
    <><Home /><div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 border border-green-500 rounded shadow-md" noValidate>
        <legend className="text-xl font-bold mb-4 w-200px">Add Manager</legend>

        <div className="mb-4">
          <label htmlFor="id" className="block mb-2">ID</label>
          <input
            type="text"
            id="managerId"
            name="managerId"
            value={managerId}
            onChange={handleChangeId}
            className="input input-ghost w-100 border border-green-500 focus:border-green-700" />
        </div>
        {idError && <p className="text-red-500 mb-2">{idError}</p>}
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChangeName}
            className="input input-ghost w-100 border border-green-500 focus:border-green-700" />
        </div>
        {nameError && <p className="text-red-500 mb-2">{nameError}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChangeEmail}
            className="input input-ghost w-100 border border-green-500 focus:border-green-700" />
        </div>
        {emailError && <p className="text-red-500 mb-2">{emailError}</p>}

        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChangePassword}
            className="input input-ghost w-100 border border-green-500 focus:border-green-700"
          />
        </div>
        {passwordError && <p className="text-red-500 mb-2">{passwordError}</p>}

        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button type="submit" className="bg-purple-100 hover:bg-yellow-400 px-4 py-3 text-sm font-semibold inline-block">
          Add
        </button>
      </form>
    </div></>
  );
}




