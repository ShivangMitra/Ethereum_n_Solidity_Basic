const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { abi, bytecode } = require('./compile')

const provider = new HDWalletProvider(
    'page unfair combine dog sketch mirror pull animal decorate lab analyst grass',
    'https://rinkeby.infura.io/v3/77e8ff36463d47128901ebd80576ae42'
)

const web3 = new Web3(provider)

const deploy = async () => {

    const accounts = await web3.eth.getAccounts()
  
    console.log('Attempting to deploy from account', accounts[0])
  
    const result = await new web3.eth.Contract(abi)
    .deploy({data: '0x' + bytecode, arguments: ['Hi There!']})
    .send({from: accounts[0]})
  
    console.log('contract deployed to : ', result.options.address)
  
}
deploy();

// 0xF4395DecDB4E1f0c3f0cB173cB83e68dE631374C