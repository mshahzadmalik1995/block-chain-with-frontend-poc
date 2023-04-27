const hre = require('hardhat');

async function main() {
    const Login = await hre.ethers.getContractFactory('Login');
    const login = await Login.deploy();
    await login.deployed();
    console.log(`Login contract deployed to address: ${login.address}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
