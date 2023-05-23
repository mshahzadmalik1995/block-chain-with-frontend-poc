
import { EvmChain } from "@moralisweb3/common-evm-utils";
import Moralis from "moralis";
export default async function getNftWithCollection(req, res) {
    
  const allNFTs = [];
  const {query} = req;
  const address = query.address;
   const chain = query.chain;
   try{
       const response = await Moralis.EvmApi.nft.getContractNFTs({
         address,
         chain,
       });
       allNFTs.push(response);
   //  console.log(allNFTs);
     res.status(200).json(allNFTs)
 
   } catch(e) {
     console.log(`Something went wrong ${e}`);
     res.status(400).json();
   }
}