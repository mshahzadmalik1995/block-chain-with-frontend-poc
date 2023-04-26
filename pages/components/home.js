import Link from "next/link"
export default function Home() {
    return(
        <nav className="max-w-6xl mx-auto p-5 flex flex-column items-center justify-between">
            <ul>
                <li><Link className="mr-4 p-6" href="/components/hairCut">HairCut</Link></li>
                <li><Link className="mr-4 p-6" href="/components/product"> Produt</Link></li>
                <li><Link href="/components/shampoo">Shampoo</Link></li>
            </ul>
        </nav>
    )
}