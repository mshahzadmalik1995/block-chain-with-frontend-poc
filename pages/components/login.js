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

    const getName = (e) => {
        setName(e.target.value);
        console.log(e.target.value)
    }
    const getPwd = (e) => {
        setPwd(e.target.value)
        console.log(e.target.value)
    }
    async function handleSubmit(event) {
        event.preventDefault();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const contractAddress = '0x4a4E0513Bb1fb0DA0AbA2f8118DE44976FE11436'; //add contract address from login.sol
        const contractABI = [
            {
              "inputs": [],
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "inputs": [],
              "name": "getUser",
              "outputs": [
                {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "string",
                  "name": "_username",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "_password",
                  "type": "string"
                }
              ],
              "name": "login",
              "outputs": [
                {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            }]; //add abi from login.json in artifacts

        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const isAuthenticated = await contract.login(name, pwd);

        if (isAuthenticated) {
            console.log(`welcome ${name}`)
            console.log(router)
            // router.push('/Home')
            router.push('/components/home')
        } else {
            alert('Incorrect password');
            return;
        }
    }
    return (
        <div className="p-5 flex flex-col items-center gap-4 justify-between">
            <div className="header">
                <h1><b>L'Oréal Blockchain POC</b></h1>
            </div>
            <input type="text" className="p-2 border-2 rounded" placeholder="Username" onChange={getName} />
            <input type="password" className="p-2 border-2 rounded" placeholder="Password" onChange={getPwd} />
            <button className="p-2 bg-sky-500 hover:bg-sky-700 rounded-full" onClick={handleSubmit}>Submit</button>
        </div>
    )
}