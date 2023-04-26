import { useRouter } from "next/router";
import { useState } from "react"
//import Home from "./Home";


export default function Login() {
    const [name,setName] = useState()
    const [pwd, setPwd] = useState()
    const router = useRouter()
    const userName= process.env.NEXT_PUBLIC_USERNAME;
    const userPwd = process.env.NEXT_PUBLIC_PASSWORD;

    const getName = (e) => {
        setName(e.target.value);
        console.log(e.target.value)
    }
    const getPwd = (e) => {
        setPwd(e.target.value)
        console.log(e.target.value)
    }
    const onSubmit = () => {
        if(name === userName && pwd === userPwd){
            console.log(`welcome ${name}`)
            console.log(router)
           // router.push('/Home')
           router.push('/components/home')
        }
    }
    return(
        <div className="p-5 flex flex-col items-center gap-4 justify-between">
            <input type="text" className="p-2 border-2 rounded" placeholder="Enter the name" onChange={getName}/>
            <input type="password" className="p-2 border-2 rounded" placeholder="Enter the password" onChange={getPwd}/>
            <button className="p-2 bg-sky-500 hover:bg-sky-700 rounded-full" onClick={onSubmit}>Submit</button>
        </div>
    )
}