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

  const handleDelete = async (supplierId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/admin/deleteSupplier/${supplierId}`);
      console.log(response.data);

      // Assuming you want to refresh the supplier list after deletion
      const updatedSuppliers = suppliers.filter((supplier) => supplier.supplierId !== supplierId);
      setSuppliers(updatedSuppliers);
    } catch (error) {
      console.error("Error:", error);
    }
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
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {suppliers.length > 0 ? (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Delete</th>
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
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(supplier?.supplierId)}
                    >
                      Delete
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
