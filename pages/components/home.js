import Link from "next/link"
export default function Home() {
    return(
        <div className="flex flex-col m-2 gap-2">
            <div className="items-center text-center">
                 <h1 className="text-red-300">Welcome to L'Oréal HomePage</h1>
            </div>
            <nav className="p-5 flex  items-center justify-around">
                <div>
                    <Link href="/components/hairCut">
                        <h1 className="p-2 text-white-100 bg-slate-200 hover:bg-sky-700 hover:text-white-100 border-2 rounded-md">
                            HairCut
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


          /*      <ul>
                    <li><Link className="mr-4 p-6" href="/components/hairCut">HairCut</Link></li>
                    <li><Link className="mr-4 p-6" href="/components/product"> Produt</Link></li>
                    <li><Link href="/components/shampoo">Shampoo</Link></li>
                </ul>*/