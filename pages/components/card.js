import { useState } from "react";

export default function Card({nftData}) {
    const nft = JSON.parse(nftData.metadata)
    const [nftImage, setNftImage] = useState(() => {
        if(nft?.image) {
            return nft.image.includes("ipfs") ?
            `https://ipfs.io/ipfs/${nft.image.split("ipfs://")[1]}`
            : nft.image.split("\\")[0]; 
        }
    })
    return(
        <div className="border-2 ml-12 mt-5 mb-12 flex flex-col items-center rounded-lg w-48 md:w-72 shadow-2xl">
            <img src={nftImage} alt="" className="w-72 h-40 rounded-lg object-cover" />
            <div className="text-white w-full p-2 bg-gradient-to-t from-[#454545] to-transparent rounded-lg pt-5 mt-10">
                <strong className="text-sl">{nft.name}</strong>
                <p className="display-inline">
                    {nft.description}
                </p>
                <div>#{nftData.token_id}</div>
    </div>
        </div>
    )
}
