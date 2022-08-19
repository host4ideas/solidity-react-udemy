# defi-staking-app-starter

## To download, simply open up the terminal and run

git clone <https://github.com/01Clarian/defi-staking-app-starter.git>

This code has been reversed engineered from Greg DAPPuniversity.com! If you enjoyed this course go check out his work ;)
Please feel free to clone and style this project at your own discretion!

### 1. To Clone or download this project simply run

git clone - <https://github.com/01Clarian/defi-staking-app-starter.git>

### 2. cd into the directory and Install the necessary packages

```powershell
npm install
```

### 3. Make sure truffle -g is installed

## Truffle commands

### truffle console

To enter into the truffle console development mode.

### truffle compiile

Compile contracts.

### truffle migrate --reset

Migrate contracts on the blockchain and reset the accounts addresses.

### truffle test

To run Moch and Chai testing suite

## Useful truffle commands for testing

- await web3.eth.getAccounts(); -> To get all the accounts from Ganache
- await Tether.deployed(); -> To grab the smart contract
- Tether.contractName; -> To get the contract's name
- tether.name() -> To get the contract's name (if name is public)

### Activate Application

Go into the App.js folder and replace the current inactive
API key with your API key.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: <https://facebook.github.io/create-react-app/docs/code-splitting>

### Analyzing the Bundle Size

This section has moved here: <https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size>

### Making a Progressive Web App

This section has moved here: <https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app>

### Advanced Configuration

This section has moved here: <https://facebook.github.io/create-react-app/docs/advanced-configuration>

### Deployment

This section has moved here: <https://facebook.github.io/create-react-app/docs/deployment>

### `npm run build` fails to minify

This section has moved here: <https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify>

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

## What is being used

- Mocha: a javascript test framework, used with Chai makes it easier to build tests.
- Truffle: a framework to build smart contracts, bundled with Ganache.
