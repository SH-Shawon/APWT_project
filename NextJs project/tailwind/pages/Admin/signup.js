import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [idError, setAdminIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const router = useRouter();

  const handleChangeName = (e) => {
    setName(e.target.value);
    setNameError('');
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handleChangeId = (e) => {
    setAdminId(e.target.value);
    setAdminIdError('');
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileError('');
  };

  const isValidFile = (file) => {
    if (!file) {
      setFileError('File is required');
      return false;
    }

    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      setFileError('Only JPG and PNG files are allowed');
      return false;
    }

    const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSizeInBytes) {
      setFileError('File size exceeds 5 MB limit');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    setError('');

    e.preventDefault();

    // Perform form validation
    if (!name || !email || !adminId || !password) {
      setError('All fields are required');
    } else if (!isValidName(name)) {
      setNameError('Name length should be at least 6');
    } else if (!isValidEmail(email)) {
      setEmailError('Invalid email address');
    } else if (!isValidId(adminId)) {
      setAdminIdError('Invalid Id number');
    } else if (!isValidPassword(password)) {
      setPasswordError('Password must be at least 6 characters long and a combination of upper and lower case');
    } else if (!isValidFile(file)) {
      // File validation failed
    } else {
      try {
        const formData = new FormData();
        formData.append('adminId', adminId);
        formData.append('name', name);
        formData.append('gmail', email);
        formData.append('password', password);
        formData.append('file', file);

        const response = await axios.post('http://localhost:3000/admin/createAccount', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data && !response.data.message) {
          // Account created successfully
          router.push('signin');
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
    const idPattern = /\d/; // At least one digit anywhere in the string
    return idPattern.test(id);
  };
  
  

  const isValidPassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{4,}$/;
    return passwordPattern.test(password);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 border border-green-500 rounded shadow-md" noValidate>
        <legend className="text-xl font-bold mb-4 w-200px">Sign Up</legend>

        <div className="mb-4">
          <label htmlFor="id" className="block mb-2">ID</label>
          <input
            type="text"
            id="adminId"
            name="adminId"
            value={adminId}
            onChange={handleChangeId}
            className="input input-ghost w-100 border border-green-500 focus:border-green-700"
          />
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
            className="input input-ghost w-100 border border-green-500 focus:border-green-700"
          />
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
            className="input input-ghost w-100 border border-green-500 focus:border-green-700"
          />
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

        <div className="mb-4">
          <label htmlFor="profile" className="block mb-2">Pic</label>
          <input type="file" onChange={handleFileChange} className="file-input file-input-bordered w-full max-w-xs" />
        </div>

        {fileError && <p className="text-red-500 mb-2">{fileError}</p>}
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button type="submit" className="bg-purple-100 hover:bg-yellow-400 px-4 py-3 text-sm font-semibold inline-block">
          Sign Up
        </button>
      </form>
    </div>
  );
}
