import { useRouter } from "next/router";
import { useState } from "react";
import { ethers } from "ethers";

export default function Common({ title }) {

    const [boxes, setBoxes] = useState(new Array(3).fill(false));
    const router = useRouter()

    async function handleSubmit(event) {
        event.preventDefault();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();

        if (title == "hairCut") {
            const contractAddress = ''; //add contract address from haircutNft.sol
            const contractABI = []; //add abi from haircutNft.json in artifacts
        } else if (title == "product") {
            const contractAddress = ''; //add contract address from productNft.sol
            const contractABI = []; //add abi from productNft.json in artifacts
        } else if (title == "shampoo") {
            const contractAddress = ''; //add contract address from shampooNft.sol
            const contractABI = []; //add abi from shampooNft.json in artifacts
        }

        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        await contract.mintNft();
    }

    const handleChange = (event, index) => {
        const _checked = [...boxes];
        _checked[index] = event.target.checked;
        setBoxes(_checked);
    }

    function isDisabled() {
        const count = boxes.filter(box => box).length;
        var value = count === 3;
        return !value;
    };
    return (
        <div className="p-5 flex flex-col gap-2">
            <div className="flex flex-col gap-3">
                <div>
                    <h1 className="font-bold">Task Mission List</h1>
                </div>
                <div className="flex items-center">
                    <input id="default-checkbox" type="checkbox"
                        value="" onChange={(event) => handleChange(event, 0)} className="w-4 h-4 text-blue-600
                    bg-gray-100 border-gray-300 rounded
                    focus:ring-blue-500 dark:focus:ring-blue-600
                        dark:ring-offset-gray-800 focus:ring-2
                        dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="checked-checkbox"
                        className="ml-2 text-sm font-bold text-gray-900 dark:text-gray-300">Task1 Completed</label>
                </div>
                <div className="flex items-center">
                    <input id="default-checkbox" type="checkbox"
                        value="" onChange={(event) => handleChange(event, 1)} className="w-4 h-4 text-blue-600
                    bg-gray-100 border-gray-300 rounded
                    focus:ring-blue-500 dark:focus:ring-blue-600
                        dark:ring-offset-gray-800 focus:ring-2
                        dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="checked-checkbox"
                        className="ml-2 text-sm font-bold text-gray-900 dark:text-gray-300">Task2 Completed</label>
                </div>
                <div className="flex items-center">
                    <input id="default-checkbox" type="checkbox"
                        value="" onChange={(event) => handleChange(event, 2)} className="w-4 h-4 text-blue-600
                    bg-gray-100 border-gray-300 rounded
                    focus:ring-blue-500 dark:focus:ring-blue-600
                        dark:ring-offset-gray-800 focus:ring-2
                        dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="checked-checkbox"
                        className="ml-2 text-sm font-bold text-gray-900 dark:text-gray-300">Task3 Completed</label>
                </div>
            </div>
            <div className="flex gap-2">
                <button className="p-2 bg-sky-500 rounded-full w-23 disabled:bg-sky-100"
                    disabled={isDisabled()} onClick={handleSubmit}>Complete Misson</button>
                <button className="p-2 bg-sky-500 rounded-full w-20 disabled:bg-sky-100"
                    onClick={() => router.back()}>Back</button>

            </div>
        </div>
    )
}