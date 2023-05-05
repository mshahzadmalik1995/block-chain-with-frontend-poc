import { useRouter } from "next/router";
import { useState } from "react"
import { ethers } from 'ethers';
//import Home from "./Home";


export default function Login() {
    const [name, setName] = useState()
    const [pwd, setPwd] = useState()
    const router = useRouter()
    const userName = process.env.NEXT_PUBLIC_USERNAME;
    const userPwd = process.env.NEXT_PUBLIC_PASSWORD;
    const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    const getName = (e) => {
        setName(e.target.value);
    }
    const getPwd = (e) => {
        setPwd(e.target.value)
    }
    async function handleSubmit(event) {
        event.preventDefault();
        if (userName === name && userPwd === pwd) {
            router.push('/components/home')
        } else {
            alert("Invalid Credentials!!");
        }
        setName("");
        setPwd("")
    }
    return (
        <div className="p-5 flex flex-col items-center gap-4 justify-between">
            <div className="header">
                <h1><b>L'Oréal Blockchain POC</b></h1>
            </div>
            <input type="text" value={name} className="p-2 border-2 rounded" placeholder="Enter the Username" onChange={getName} />
            <input type="password" value={pwd} className="p-2 border-2 rounded" placeholder="Enter the Password" onChange={getPwd} />
            <button className="p-2 bg-sky-500 hover:bg-sky-700 rounded-full" onClick={handleSubmit}>Login</button>
        </div>
    )
}