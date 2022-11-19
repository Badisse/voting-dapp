import { ethers } from 'hardhat';

async function main() {
    const [owner] = await ethers.getSigners();
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy();

    await voting.deployed();

    console.log(`Voting deployed to ${voting.address}`);
    console.log(`Owner is ${owner.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
