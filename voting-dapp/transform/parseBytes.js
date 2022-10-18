/**
 * @file Convert bytes into strings
 */
const ethers = require("ethers");

async function parseBytes(args) {
    const bytes = args[0];
    const name = ethers.utils.parseBytes32String(bytes);
    console.log(name);
}

parseBytes(process.argv.slice(2));
