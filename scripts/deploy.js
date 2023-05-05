const hre = require('hardhat');
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

const imagesLocation = './images/randomNft'

async function main() {

    if (process.env.UPLOAD_PINATA == "true") {
        const tokenUris = await handleTokenUris();
    } else {
        const Nft1 = await hre.ethers.getContractFactory('HaircutNft');
        const nft1 = await Nft1.deploy();
        await nft1.deployed();
        console.log(`Nft contract deployed to address: ${nft1.address}`);

        const Nft2 = await hre.ethers.getContractFactory('ProductNft');
        const nft2 = await Nft2.deploy();
        await nft2.deployed();
        console.log(`Nft contract deployed to address: ${nft2.address}`);

        const Nft3 = await hre.ethers.getContractFactory('ShampooNft');
        const nft3 = await Nft3.deploy();
        await nft3.deployed();
        console.log(`Nft contract deployed to address: ${nft3.address}`);

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
