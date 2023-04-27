pragma solidity ^0.8.18;

contract Login {
    struct User {
        string username;
        string password;
    }

    User[] private userList;

    mapping(address => User) users;

    constructor() {
        userList.push(User("tushar", "hello"));
    }

    function getUser() public view returns (string memory) {
        return users[msg.sender].username;
    }

    function login(
        string memory _username,
        string memory _password
    ) public view returns (bool) {
        return (keccak256(bytes(userList[0].username)) ==
            keccak256(bytes(_username)) &&
            keccak256(bytes(userList[0].password)) ==
            keccak256(bytes(_password)));
    }
}
