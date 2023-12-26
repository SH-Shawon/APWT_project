import { useRouter } from "next/router";
export default function Manager(){
    const router= useRouter();
    router.push("./addManager");
} 