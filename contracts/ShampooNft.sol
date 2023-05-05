// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ShampooNft is ERC721 {
    string public constant TOKEN_URI =
        "ipfs://QmdENiBcSLgxAgGSh8fLJHkyEPnavBwvAE7mXeUUZAFGF4";
    uint256 private s_tokenCounter;

    constructor() ERC721("NFT Reward", "Reward for Service") {
        s_tokenCounter = 0;
    }

    function mintNft() public {
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter = s_tokenCounter + 1;
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
