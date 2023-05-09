// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ProductNft is ERC721 {
    string internal TOKEN_URI;
    uint256 private s_tokenCounter;

    event NftMinted(address minter);

    constructor(
        string memory tokenURI
    ) ERC721("NFT Reward", "Reward for Service") {
        s_tokenCounter = 0;
        TOKEN_URI = tokenURI;
    }

    function mintNft() public {
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter = s_tokenCounter + 1;
        emit NftMinted(msg.sender);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        return TOKEN_URI;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}
