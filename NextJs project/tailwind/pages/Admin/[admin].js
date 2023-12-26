import Navbar from "../component/navbar";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import ManagersList from "./Manager/ManagersList";

export default function Admin() {
  const router = useRouter();
  const { admin } = router.query;
  const loginCookie = Cookies.get("Admin");
  console.log(loginCookie);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h3 className="text-2xl font-bold mb-4">Hi, {admin}</h3>
        <ManagersList/>
        {/* Add the rest of your Admin content here */}
      </div>
    </>
  );
}
