import axios from 'axios';
import React, { useState } from 'react';
import Image from 'next/image';
import { useEffect } from 'react';
import Header from './header';
const Navbar = () => {
  const [isDropdownVisible, setDropdownVisibility] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  const toggleDropdown = () => {
    setDropdownVisibility(!isDropdownVisible);
  };
  

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const adminId = localStorage.getItem('Admin');
        const response = await axios.get(`http://localhost:3000/admin/profilePic/${adminId}`, {
          responseType: 'arraybuffer', 
        });

        const base64Image = Buffer.from(response.data, 'binary').toString('base64');

        setProfilePic(`data:image/jpeg;base64,${base64Image}`);
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };
    const fetchAdminDetails = async () => {
      try {
        const adminId = localStorage.getItem('Admin');
        const response = await axios.get(`http://localhost:3000/admin/getAdmin/${adminId}`, {
          responseType: 'json',
        });

        console.log('Response:', response);

        if (response.data && response.data.admin) {
          console.log('Admin Email:', response.data.admin.gmail);
          setAdminEmail(response.data.admin.gmail);
        } else {
          console.error('Admin details or email not available in the response:', response.data);
        }
      } catch (error) {
        console.error('Error fetching profile picture and admin details:', error);
      }
    };

    fetchAdminDetails();
    fetchProfilePic();
  }, []);


  return (
    <>
      <nav className="bg-purple-200 border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <Header title='Admin'/>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative">
          <a href="/Admin" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ABC E-commerce site</span>
          </a>
          <div className="ml-auto flex items-center space-x-8">
            <ul className="flex flex-row items-center space-x-4">
              <li>
                <a href="/Admin/Manager/addManager" className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500">
                  Add Manager
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-blue-500">
                  Services
                </a>
              </li>
              <li>
                <button className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="badge badge-xs badge-primary indicator-item"></span>
                  </div>
                </button>
              </li>
            </ul>
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded={isDropdownVisible}
              onClick={toggleDropdown}
            >
              <span className="sr-only">Open user menu</span>
              <img className="w-8 h-8 rounded-full" src={profilePic} alt="user photo" />
            </button>
            <div
              className={`absolute top-full right-0 z-50 ${isDropdownVisible ? '' : 'hidden'} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">Shawon</span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{adminEmail}</span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Settings
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Earnings
                  </a>
                </li>
                <li>
                  <a href="/Admin/signout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
