import { useEffect, useState } from 'react';
import Header from './component/header';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [adminId, setAdminId] = useState('');

  useEffect(() => {
    const storedAdminId = localStorage.getItem("Admin");

    if (!storedAdminId) {
      router.push('/Admin');
    } else {
      router.push('/Admin/' + storedAdminId); // Updated pathname
      setAdminId(storedAdminId);
      console.log("admin is", storedAdminId);
    }
  }, []);

  return (
    <>
      <Header title="Home" />
      <h1>Home</h1>

      <div className="bg-blue-600 text-black p-4">
        <h5 className="font-bold underline">This is the home page admin {adminId} </h5>
        <p>Hello</p>
      </div>

      <button className="bg-purple-100 hover:bg-yellow-400 px-4 py-3 text-center text-sm font-semibold inline-block">
        Tailwind Button
      </button>
    </>
  );
}
