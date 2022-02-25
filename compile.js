const path = require('path')
const fs = require('fs')
const solc = require('solc')

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol')
const source = fs.readFileSync(inboxPath, 'utf8')

var input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};

// console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts['Inbox.sol']['Inbox'].abi)
// console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts['Inbox.sol']['Inbox'].evm.bytecode.object)

var output = JSON.parse(solc.compile(JSON.stringify(input)));
exports.abi = output.contracts['Inbox.sol']['Inbox'].abi;
exports.bytecode = output.contracts['Inbox.sol']['Inbox'].evm.bytecode.object;