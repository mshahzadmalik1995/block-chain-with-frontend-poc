import { GetIpfsUrlFromPinata } from "@/utils/utils"
import Link from "next/link";

export default function NFTTile(data) {

    console.log(`data : ${data.data.tokenId}`)
    
    const newTo = {
        pathname:"/components/nftDetails/[tokenId]",
        query: {tokenId: data.data.tokenId}
    }

    const IPFSUrl = GetIpfsUrlFromPinata(data.data.image);
    return (
        <Link href={newTo}>
            <div className="border-2 ml-12 mt-5 mb-12 flex flex-col items-center rounded-lg w-48 md:w-72 shadow-2xl">
                <img src={IPFSUrl} alt="" className="w-72 h-8- rounded-lg object-cover" />
                <div className="text-white w-full p-2 bg-gradient-to-t from-[#454545] to-transparent rounded-lg pt-5 mt-20">
                    <strong className="text-sl">{data.data.name}</strong>
                    <p className="display-inline">
                        {data.data.description}
                    </p>
                </div>
            </div>
        </Link>
    )
}