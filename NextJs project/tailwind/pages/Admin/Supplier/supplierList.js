import { requireAuthentication } from '@/pages/component/auth';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from '@/pages/component/navbar';
import { useRouter } from 'next/router';

const SupplierList = () => {
    const router = useRouter();
    useEffect(() => {
      requireAuthentication(router);
    }, []);
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState('');
  const [searchValue, setSearchValue] = useState('');


  const handleDetailsClick = (supplierId) => {
    router.push(`/Admin/Supplier/${supplierId}`);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/admin/getSupplierById/${searchValue}`);

      if (response.data && response.data.supplier) {
        setSuppliers([response.data.supplier]);
        setError('');
      } else {
        setSuppliers([]);
        setError('No match found');
      }
    } catch (error) {
      console.error(error);
      setSuppliers([]); // Set suppliers to an empty array in case of an error
      setError('Something went wrong');
    }
  };

  const handleAddSupplier = () => {
    router.push('/Admin/Supplier/addSupplier'); // Change the route based on your actual route structure
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/getAllSupplier');

        if (response.data && response.data.supplier) {
          setSuppliers(response.data.supplier);
        } else {
          setError('Unable to fetch suppliers');
        }
      } catch (error) {
        console.error(error);
        setSuppliers([]);
        setError('Something went wrong');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Home />
      <div className="container mx-auto my-8">
        <div className="flex items-center mb-4">
          <h2 className="text-2xl font-bold mr-4">Suppliers List</h2>
          <input
            type="text"
            id="searchValue"
            placeholder="Search Supplier"
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
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={handleAddSupplier}
          >
            Add Supplier
          </button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {suppliers.length > 0 ? (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Details</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.supplierId} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{supplier?.supplierId || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{supplier?.name || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{supplier?.gmail || 'N/A'}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDetailsClick(supplier?.supplierId)}
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
};

export default SupplierList;
