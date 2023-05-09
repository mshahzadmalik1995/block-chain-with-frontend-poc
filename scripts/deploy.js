const hre = require('hardhat');
const fs = require("fs");
const { storeImages, storeTokenUriMetadata } = require("../utils/uploadToPinata")

const metadataTemplate = {
    name: "",
    description: "",
    image: "",
    attributes: [
        {
            trait_type: "NFT Reward",
            value: 100,
        },
    ],
}
const imagesLocation = './images/randomNft';

async function main() {

    if (process.env.UPLOAD_PINATA == "true") {
        tokenUris = await handleTokenUris();
        const data = {
            haircut: tokenUris[0],
            product: tokenUris[1],
            shampoo: tokenUris[2]
        };
        fs.writeFileSync('./images/tokenURIs.json', JSON.stringify(data));
    } else {
        const tokenUris = JSON.parse(fs.readFileSync('./images/tokenURIs.json', { encoding: "utf8" }));

        const Nft1 = await hre.ethers.getContractFactory('HaircutNft');
        const nft1 = await Nft1.deploy(tokenUris.haircut);
        await nft1.deployed();
        console.log(`Nft contract deployed to address: ${nft1.address}`);
        const data1 = {
            address: nft1.address,
            abi: JSON.parse(nft1.interface.format('json'))
        };
        fs.writeFileSync('./pages/haircutNft.json', JSON.stringify(data1));

        const Nft2 = await hre.ethers.getContractFactory('ProductNft');
        const nft2 = await Nft2.deploy(tokenUris.product);
        await nft2.deployed();
        console.log(`Nft contract deployed to address: ${nft2.address}`);
        const data2 = {
            address: nft2.address,
            abi: JSON.parse(nft2.interface.format('json'))
        };
        fs.writeFileSync('./pages/productNft.json', JSON.stringify(data2));

        const Nft3 = await hre.ethers.getContractFactory('ShampooNft');
        const nft3 = await Nft3.deploy(tokenUris.shampoo);
        await nft3.deployed();
        console.log(`Nft contract deployed to address: ${nft3.address}`);
        const data3 = {
            address: nft3.address,
            abi: JSON.parse(nft3.interface.format('json'))
        };
        fs.writeFileSync('./pages/shampooNft.json', JSON.stringify(data3));

    }
}

async function handleTokenUris() {
    tokenUris = []
    const { responses: imageUploadResponses, files } = await storeImages(imagesLocation)
    for (imageUploadResponseIndex in imageUploadResponses) {
        let tokenUriMetadata = { ...metadataTemplate }
        tokenUriMetadata.name = files[imageUploadResponseIndex].replace(".png", "")
        tokenUriMetadata.description = `An adorable ${tokenUriMetadata.name} pup!`
        tokenUriMetadata.image = `ipfs://${imageUploadResponses[imageUploadResponseIndex].IpfsHash}`
        console.log(`Uploading ${tokenUriMetadata.name}...`)
        const metadataUploadResponse = await storeTokenUriMetadata(tokenUriMetadata)
        tokenUris.push(`ipfs://${metadataUploadResponse.IpfsHash}`)
    }
    console.log("Token URIs uploaded! They are:")
    console.log(tokenUris)
    return tokenUris
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
