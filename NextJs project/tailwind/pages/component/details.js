import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [adminEmail, setAdminEmail] = useState('');

  useEffect(() => {
    const fetchProfilePicAndAdminDetails = async () => {
      try {
        // Retrieve adminId from localStorage
        const adminId = localStorage.getItem('Admin');

        // Make a request to the backend API to get the profile picture and admin details
        const response = await axios.get(`http://localhost:3000/admin/getAdmin/${adminId}`, {
          responseType: 'json',
        });

        // Log the full response for debugging
        console.log('Response:', response);

        // Check if data and admin properties exist
        if (response.data && response.data.admin) {
          // Log the admin email
          console.log('Admin Email:', response.data.admin.gmail);

          // Set the admin email
          setAdminEmail(response.data.admin.gmail);
        } else {
          console.error('Admin details or email not available in the response:', response.data);
        }
      } catch (error) {
        console.error('Error fetching profile picture and admin details:', error);
      }
    };

    fetchProfilePicAndAdminDetails();
  }, []);


  return (
    <>
      <h1>{adminEmail}</h1>
    </>
  );
};

export default Navbar;
