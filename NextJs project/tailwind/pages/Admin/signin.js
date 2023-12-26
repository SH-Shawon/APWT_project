import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { decode } from "jwt-decode";


export default function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChangeId = (e) => {
    setId(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation
    if (!id || !password) {
      setError("ID and password are required");
    } else if (!isValidId(id)) {
      setError("Invalid ID");
    } else {
      try {
        const response = await axios.post("http://localhost:3000/admin/login", {
          adminId: id,
          password: password,
        });

        // ,{
        //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        //   withCredentials: true
        //   }

        if (response.data) {
          const Admin = response.data;
          console.log("Admin is: " + response.data);
          localStorage.setItem('Admin',Admin)

          Cookies.set("Admin", Admin, { expires: 60 });

          
          
          const loginCookie = Cookies.get("Admin");
          //alert(loginCookie);
          // if(loginCookie){
          //   alert("found" + loginCookie);
          // }else{
          //   alert("not found")
          // }
          //const decodedToken = decode(token);
        //const adminId = decodedToken.id;

        //alert("Admin ID is: " + decodedToken);
        // router.push("Manager/addManager");
         router.push(({
               pathname: './'+loginCookie,
    
           }));

        }
        else{
          alert("Invalid username or password");
        }
      } catch (error) {
        console.error(error);
        setError("Something went wrong");
      }
    }
    
  };
 

  const isValidId = (id) => {
    const idPattern = /^.{1,}$/;
    return idPattern.test(id);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 border border-gray-300 rounded shadow-md">
        <legend className="text-xl font-bold mb-4">Login</legend>
        <div className="mb-4">
          <label className="inline-block mr-12 mb-2">ID:</label>
          <input
            type="text"
            placeholder="Enter your ID"
            className="input input-ghost w-100 border border-green-500 focus:border-green-700"
            name="id"
            value={id}
            onChange={handleChangeId}
          />
        </div>
        <div className="mb-4">
          <label>Password</label>
          <input
            type="password"
            className="input input-ghost w-100 border border-green-500 focus:border-green-700"
            name="password"
            value={password}
            onChange={handleChangePassword}
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="text-center">
          <button
            className="bg-purple-100 hover:bg-yellow-400 px-4 py-3 text-sm font-semibold inline-block"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}
