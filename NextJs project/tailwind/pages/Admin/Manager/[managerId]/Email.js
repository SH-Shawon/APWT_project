import { requireAuthentication } from '@/pages/component/auth';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import axios from 'axios';
import Home from '@/pages/component/navbar';

const EmailPage = ({ managerId }) => {
  const router = useRouter();
    useEffect(() => {
      requireAuthentication(router);
    }, []);
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');

  const handleSend = async () => {
    try {
      if (!subject.trim() || !text.trim()) {
        alert('Please fill in both the subject and email body.');
        return;
      }

      const response = await axios.post(`http://localhost:3000/admin/sendMail/${managerId}`, {
        subject,
        text,
      });

      console.log(response.data);
      alert(response.data.message);
      router.back();
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <Home />
      <div className="container mx-auto my-8">
        <h2 className="text-3xl font-bold mb-4">Send Email to Manager</h2>
        <div className="border p-4 rounded-md shadow-md">
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
              Email Body
            </label>
            <textarea
              id="text"
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="flex">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleSend}
            >
              Send
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={handleGoBack}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailPage;

export async function getServerSideProps(context) {
  const { managerId } = context.query;

  return {
    props: {
      managerId,
    },
  };
}
