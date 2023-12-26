// ManagersList.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import Home from '@/pages/component/navbar';

export default function ManagersList() {
  const [managers, setManagers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/getAllManagers');

        if (response.data && response.data.managers) {
          setManagers(response.data.managers);
        } else {
          setError('Unable to fetch managers');
        }
      } catch (error) {
        console.error(error);
        setError('Something went wrong');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Home />
      <div className="container mx-auto my-8">
        <h2 className="text-2xl font-bold mb-4">Managers List</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((manager) => (
              <tr key={manager.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{manager.manager.managerId}</td>
                <td className="py-2 px-4 border-b">{manager.manager.name}</td>
                <td className="py-2 px-4 border-b">{manager.manager.gmail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
