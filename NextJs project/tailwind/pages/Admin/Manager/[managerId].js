
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import axios from 'axios';
import { requireAuthentication } from '@/pages/component/auth';

export default function ManagerDetails({ manager }) {
  const router = useRouter();
  useEffect(() => {
    requireAuthentication(router);
  }, []);

  if (router.isFallback) {
    return <div className="container mx-auto my-8">Loading...</div>;
  }

  if (!manager) {
    return <div className="container mx-auto my-8">Manager not found</div>;
  }

  const handleGoBack = () => {
    router.back();
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/admin/deleteManager/${manager.manager.managerId}`);
      console.log(response.data);
      router.back();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold mb-4">Manager Details</h2>
      <div className="border p-4 rounded-md shadow-md">
        <p className="mb-2">
          <strong>ID:</strong> {manager.manager.managerId}
        </p>
        <p className="mb-2">
          <strong>Name:</strong> {manager.manager.name}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {manager.manager.gmail}
        </p>
        <p className="mb-2">
          <strong>Address:</strong> {manager.manager.address || 'Not available'}
        </p>
        <p className="mb-2">
          <strong>Birthday:</strong> {manager.manager.birthDay || 'Not available'}
        </p>
        <p className="mb-2">
          <strong>Blood Group:</strong> {manager.manager.bloodGroup || 'Not available'}
        </p>
        <p className="mb-2">
          <strong>Password:</strong> {manager.manager.password}
        </p>
        <p className="mb-2">
          <strong>Profile Picture:</strong> {manager.manager.pic || 'Not available'}
        </p>
        <p className="mb-2">
          <strong>Joining Time:</strong> {manager.manager.joiningTime}
        </p>
      </div>
      <div className="mt-4">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={handleGoBack}
        >
          Close
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { managerId } = context.query;

  try {
    const response = await axios.get(`http://localhost:3000/admin/getManagerById/${managerId}`);

    if (response.data && response.data.managers) {
      return {
        props: {
          manager: response.data.managers,
        },
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
