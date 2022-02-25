const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())
const { abi, bytecode } = require('../compile')


// class Car{
//     park(){
//         return 'stopped';
//     }

//     drive(){
//         return 'vroom';
//     }
// }

// let car

// beforeEach(() => {
//     car = new Car()
// })

// describe('Car', () => {
//     it('can park', () => {
//         assert.equal(car.park(), 'stopped')
//     })

//     it('can drive', () => {
//         assert.equal(car.drive(), 'vroom')
//     })
// })

// beforeEach(() => {
//     web3.eth.getAccounts()
//     .then(fetchedAccounts => {
//         console.log(fetchedAccounts)
//     })
// })

let accounts
let inbox

beforeEach(async () => {
    accounts = await web3.eth.getAccounts()

    inbox = await new web3.eth.Contract(abi)
    .deploy({
        data: bytecode,
        arguments: ['Hi There!']
    })
    .send({
        from: accounts[0],
        gas: '1000000'
    })
})

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address)
    })

    it('has a default message', async () => {
        const message = await inbox.methods.message().call()
        assert.equal(message, 'Hi There!')
    })

    it('can change the message', async () => {
        await inbox.methods.setMessage('Hello There').send({
            from: accounts[0],
            gas: '1000000'
        })
        const message = await inbox.methods.message().call()
        assert.equal(message, 'Hello There')
    })
})