/**
 * @file Converts strings into bytes
 */
const ethers = require("ethers");

async function createBytes(args) {
    const name = args[0];
    const bytes = ethers.utils.formatBytes32String(name);
    console.log("name: ", bytes);
}

/*
	The "argv" array contains everything given on the command line. 
	The first item (argv[0]) will be the path to node itself, and the second item (argv[1]) will be the path to your script code. 
*/
createBytes(process.argv.slice(2));
