import Link from "next/link";
import { ConnectWallet, useDisconnect, useWallet } from "@thirdweb-dev/react";
export default function Navbar() {

    

    const disConnect = useDisconnect()

    return (

        <div className="flex flex-row justify-between items-center text-center mt-5 mb-2">
            <div>
                <h1 className="text-gray-800  font-bold">Welcome to L'Oréal HomePage</h1>
            </div>
            <div className="flex w-60">
                <ul className="flex items-center justify-between gap-3">
                    <li>
                        <Link className="text-gray-800 text-xl hover:underline hover:text-white-100" href="/components/marketplace">Marketplace</Link>
                    </li>
                    <li>
                        <Link className="text-gray-800 text-xl hover:underline hover:text-white-100" href="/components/sellNFT">UploadNft</Link>
                    </li>
                    <li>
                        <Link className="text-gray-800 text-xl hover:underline hover:text-white-100" href="/components/profile">Profile</Link>
                    </li>
                    <li>
                        <Link className="text-gray-800 text-xl hover:underline hover:text-white-100" href="/components/home">Home</Link>
                    </li>
                </ul>
            </div>
            <div className="flex gap-2 justify-between">
            <div className="float-right">
                <ConnectWallet/>
            </div>
                <div className="float-right">
                    <Link href="/" onClick={disConnect}>
                        <h1 className="p-1.5 text-white-100 bg-slate-200 hover:bg-sky-700 hover:text-white-100 border-2 rounded-md">
                            Logout
                        </h1>
                    </Link>
                </div>
            </div>
        {/*<div >
            <ul className="flex items-center justify-between gap-3">
                <li>
                    <Link className="text-gray-800 text-xl hover:underline hover:text-white-100" href="/components/marketplace">Marketplace</Link>
                </li>
                <li>
                    <Link className="text-gray-800 text-xl hover:underline hover:text-white-100" href="/components/profile">Profile</Link>
                </li>
            </ul>
    </div>*/}
    </div> 
    )
}