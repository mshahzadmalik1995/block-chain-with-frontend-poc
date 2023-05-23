import { GetIpfsUrlFromPinata } from "@/utils/utils"
import { useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
import {ethers} from 'ethers';

export default function NFTTile(data) {

   // console.log(`data : ${JSON.stringify(data)}`)

    const address = useAddress();

    //console.log(data.data)

    const newTo = {
        pathname:"/components/[nftDetails]",
        query: {nftDetails: data.data?.tokenId, mid: data.data?.marketplaceId}
    }
    

    const truncateStr = (fullStr, strLen) => {
        if (fullStr.length <= strLen) return fullStr
    
        const separator = "..."
        const seperatorLength = separator.length
        const charsToShow = strLen - seperatorLength
        const frontChars = Math.ceil(charsToShow / 2)
        const backChars = Math.floor(charsToShow / 2)
        return (
            fullStr.substring(0, frontChars) +
            separator +
            fullStr.substring(fullStr.length - backChars)
        )
    }


    const isOwnedByUser = data.data?.seller === address || data.data?.seller === undefined
    const formattedSellerAddress = isOwnedByUser ? "you" : truncateStr(data.data?.seller || "", 15)
    return (
        <Link href={newTo}>
            <div className="border-2 ml-12 mt-5 mb-12 flex flex-col items-center rounded-lg w-48 md:w-72 shadow-2xl">
               
                <img src={data.data?.image} alt="" className="w-72 h-40 rounded-lg object-cover" />
                <div className="text-white w-full p-2 bg-gradient-to-t from-[#454545] to-transparent rounded-lg pt-5 mt-1">
                    <div>
                        <div>#{data.data?.tokenId}</div>
                        <div className="italic text-sm">
                            Owned by {formattedSellerAddress}
                        </div>
                    </div>
                    <strong className="text-sl">{data.data?.name}</strong>
                    <p className="display-inline">
                        {data.data?.description}
                    </p>
                    <div className="font-bold">
                         {data.data?.price} ETH
                    </div>
                </div>
            </div>
        </Link>
    )
}