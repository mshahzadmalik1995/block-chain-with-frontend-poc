import Link from "next/link"
import { ConnectWallet, useDisconnect, useWallet } from "@thirdweb-dev/react";
export default function Home() {

    const disConnect = useDisconnect()

    return(
        <div className="flex flex-col m-2 gap-2">
            <div className="items-center text-center">
                 <h1 className="text-gray-800  font-bold">Welcome to L'Oréal HomePage</h1>
                 <div className="flex gap-2 justify-between">
                    <div className="float-right">
                        <ConnectWallet/>
                    </div>
                    <div className="float-right">
                        <Link href="/" onClick={disConnect}>
                            <h1 className="p-2 text-white-100 bg-slate-200 hover:bg-sky-700 hover:text-white-100 border-2 rounded-md">
                                Logout
                            </h1>
                        </Link>
                    </div>
                 </div>
            </div>
            <nav className="p-5 flex  items-center justify-around">
                <div>
                    <Link href="/components/hairCut">
                        <h1 className="p-2 text-white-100 bg-slate-200 hover:bg-sky-700 hover:text-white-100 border-2 rounded-md">
                            Haircut
                        </h1>
                    </Link>
                </div>
                <div>
                    <Link  href="/components/product">
                        <h1 className="p-2 text-white-100 bg-slate-200 hover:bg-sky-700 hover:text-white-100 border-2 rounded-md">
                            Product
                        </h1>
                    </Link>
                </div>
                <div>
                    <Link href="/components/shampoo">
                        <h1 className="p-2 text-white-100 bg-slate-200 hover:bg-sky-700 hover:text-white-100 border-2 rounded-md">
                            Shampoo
                        </h1>
                    </Link>
                </div>
            </nav>
            
        </div>
    )
}