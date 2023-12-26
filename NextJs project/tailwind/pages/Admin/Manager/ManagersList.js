import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Home from '@/pages/component/navbar';

export default function ManagersList() {
  const [managers, setManagers] = useState([]);
  const [error, setError] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleDetailsClick = (managerId) => {
    router.push(`/Admin/Manager/${managerId}`);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/admin/getManagerById/${searchValue}`);

      if (response.data && response.data.managers) {
        setManagers([response.data.managers]);
        setError('');
      } else {
        setManagers([]);
        setError('No match found');
      }
    } catch (error) {
      console.error(error);
      setManagers([]); // Set managers to an empty array in case of an error
      setError('Something went wrong');
    }
  };

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
        setManagers([]);
        setError('Something went wrong');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container mx-auto my-8">
        <div className="flex items-center mb-4">
          <h2 className="text-2xl font-bold mr-4">Managers List</h2>
          <input
            type="text"
            id="adminId"
            placeholder="Enter Admin ID"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="border p-2 rounded-md mr-2"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {managers.length > 0 ? (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Join</th>
                <th className="py-2 px-4 border-b">Details</th>
              </tr>
            </thead>
            <tbody>
              {managers.map((manager) => (
                <tr key={manager.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{manager?.manager?.managerId || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{manager?.manager?.name || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{manager?.manager?.gmail || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{manager?.manager?.joiningTime || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDetailsClick(manager?.manager?.managerId)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          error && <p>{error}</p>
        )}
      </div>
    </>
  );
}



