//SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";


error NotOwner();

contract NFTMarketplaceAddress is ReentrancyGuard {
    
    using Counters for Counters.Counter;
    Counters.Counter private marketplaceIds;
    Counters.Counter private totalMarketplaceItemsSold;

    struct Listing {
        uint marketplaceId;
        address nftAddress;
        uint tokenId;
        address payable seller;
        address payable owner;
        uint listPrice;
    }

    mapping(uint => Listing) private marketplaceIdToListingItem;
    mapping(uint => bool) private keyExists;
    //mapping(address => uint) private s_proceeds;

    modifier isOwner(
        address nftAddress,
        uint256 tokenId,
        address spender
    ) {
        IERC721 nft = IERC721(nftAddress);
        address owner = nft.ownerOf(tokenId);
        if (spender != owner) {
            revert NotOwner();
        }
        _;
    }

    function createListing(
        uint tokenId,
        address nftAddress,
        uint price
    ) public nonReentrant
        isOwner(nftAddress, tokenId, msg.sender) {
        require(price > 0, "List price must be 1 ethers");
        IERC721 nft = IERC721(nftAddress);
        //require(nft.getApproved(tokenId) != address(this), "Not Approved for marketplace");
        marketplaceIds.increment();
        uint marketplaceItemId = marketplaceIds.current();
        marketplaceIdToListingItem[marketplaceItemId] = Listing(
            marketplaceItemId,
            nftAddress,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price
        );
        keyExists[marketplaceItemId] = true;
        //IERC721(nftAddress).transferFrom(msg.sender, address(this), tokenId);
        nft.transferFrom(msg.sender, address(this), tokenId);
    }

    function buyListing(
        uint marketplaceItemId, 
        address nftAddress
    ) public payable nonReentrant
    {
        uint price = marketplaceIdToListingItem[marketplaceItemId].listPrice;
        require(
            msg.value == price,
            "Value sent does not meet list price"
        );
        uint tokenId = marketplaceIdToListingItem[marketplaceItemId].tokenId;
        marketplaceIdToListingItem[marketplaceItemId].seller.transfer(msg.value);
        IERC721(nftAddress).transferFrom(address(this), msg.sender, tokenId);
        //IERC721(nftAddress).transferFrom(marketplaceIdToListingItem[marketplaceItemId].seller, msg.sender, tokenId);
        marketplaceIdToListingItem[marketplaceItemId].owner = payable(msg.sender);
        marketplaceIdToListingItem[marketplaceItemId].seller = payable(msg.sender);
        keyExists[marketplaceItemId] = false;
       // IERC721(nftAddress).approve(address(this), tokenId);
        totalMarketplaceItemsSold.increment();
        //delete(marketplaceIdToListingItem[marketplaceItemId]);
    }

    function updateListingPrice(
        address nftAddress,
        uint tokenId,
        uint marketplaceId,
        uint newPrice
    )
    external
    nonReentrant
    isOwner(nftAddress, tokenId, msg.sender) {
        require(newPrice <= 0, "must be greater than 0");
        marketplaceIdToListingItem[marketplaceId].listPrice = newPrice;
    }

    function getMarketItem(uint marketplaceItemId) 
        public view returns(Listing memory) {
            return marketplaceIdToListingItem[marketplaceItemId];
    }

    function getMyListedNFTs() public view returns(Listing[] memory) {
        uint totalListingCount = marketplaceIds.current();
        uint listingCount = 0;
        uint index = 0;
        for(uint i = 0; i<totalListingCount;i++) {
            if(marketplaceIdToListingItem[i+1].owner == msg.sender) {
                listingCount += 1;
            }
        }
        Listing[] memory items = new Listing[](listingCount);
        for(uint i = 0;i<totalListingCount;i++) {
            if(marketplaceIdToListingItem[i+1].owner == msg.sender) {
                uint currentId = marketplaceIdToListingItem[i+1].marketplaceId;
                Listing memory currentItem = marketplaceIdToListingItem[currentId];
                items[index] = currentItem;
                index += 1;
            }
        }
        return items;
    }

    function getAllNFTs() public view returns(Listing[] memory) {
        uint totalListingCount = marketplaceIds.current();
        uint listingCount = 0;
        uint index = 0;
        Listing[] memory items = new Listing[](totalListingCount);
        for(uint i = 0; i< totalListingCount; i++) {
            listingCount = i+1;
            bool flagValue = keyExists[listingCount];
            if(flagValue) {
                Listing storage currentItem = marketplaceIdToListingItem[listingCount];
                items[index] = currentItem;
                index += 1;
            }
        }
        Listing[] memory actualData = new Listing[](index);
        for(uint i = 0;i < index; i++) {
            actualData[i] = items[i];
        }
        return actualData;
    }


}