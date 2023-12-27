import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Home from '@/pages/component/navbar';
import Cookies from 'js-cookie';
import { requireAuthentication } from '@/pages/component/auth';

const AddSupplier = () => {
  const router = useRouter();
  useEffect(() => {
    requireAuthentication(router);
  }, []);

  const [name, setName] = useState('');
  const [gmail, setGmail] = useState('');

  const [nameError, setNameError] = useState('');
  const [gmailError, setGmailError] = useState('');
  const [error, setError] = useState('');

  const adminId = Cookies.get('Admin');
  console.log('admin is' + adminId);

  const handleChangeName = (e) => {
    setName(e.target.value);
    setNameError('');
  };

  const handleChangeGmail = (e) => {
    setGmail(e.target.value);
    setGmailError('');
  };

  const handleSubmit = async (e) => {
    setError('');

    e.preventDefault();

    // Perform form validation
    if (!name || !gmail) {
      setError('All fields are required');
    } else if (!isValidName(name)) {
      setNameError('Name length should be at least 6');
    } else if (!isValidGmail(gmail)) {
      setGmailError('Invalid email address');
    } else {
      try {
        const response = await axios.post(`http://localhost:3000/admin/addSupplier`, {
          name: name,
          gmail: gmail,
        });

        if (response.data && !response.data.message) {
            alert(response.data);
          router.push(`/Admin/Supplier/${response.data.supplierId}`);
        } else {
          setError(response.data.message || 'Supplier creation failed');
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

  const isValidGmail = (gmail) => {
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(gmail);
  };

  return (
    <>
      <Home />
      <div className="flex items-center justify-center h-screen">
        <form onSubmit={handleSubmit} className="bg-white p-8 border border-green-500 rounded shadow-md" noValidate>
          <legend className="text-xl font-bold mb-4 w-200px">Add Supplier</legend>

          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChangeName}
              className="input input-ghost w-100 border border-green-500 focus:border-green-700"
            />
            {nameError && <p className="text-red-500 mb-2">{nameError}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="gmail" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="gmail"
              name="gmail"
              value={gmail}
              onChange={handleChangeGmail}
              className="input input-ghost w-100 border border-green-500 focus:border-green-700"
            />
            {gmailError && <p className="text-red-500 mb-2">{gmailError}</p>}
          </div>

          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button type="submit" className="bg-purple-100 hover:bg-yellow-400 px-4 py-3 text-sm font-semibold inline-block">
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default AddSupplier;
