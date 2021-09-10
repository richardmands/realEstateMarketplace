const ERC721MintableComplete = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', async (accounts) => {

    let contract
    
    before('setup contract', async () => {
        console.log("🚀 ~ accounts", accounts.length)
        contract = await ERC721MintableComplete.new({from: accounts[0]});
        // TODO: mint multiple tokens
        await Promise.all([1,2,3,4,5].map(async (token, i) => await contract.mint(accounts[i], token)))
    })
 
    describe('match erc721 spec', function () {

        it('should return total supply', async function () { 
            const totalSupply = await contract.totalSupply()
            console.log("🚀 ~ totalSupply", totalSupply)
            assert.equal(totalSupply, 5)
        })

        it('should get token balance', async function () { 
            const balance = await contract.balanceOf(accounts[0])
            console.log("🚀 ~ balance", balance)
            assert.equal(balance, 1)
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            const uri = await contract.tokenURI(1)
            console.log("🚀 ~ uri", uri)
            assert.equal(uri, 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1')
        })

        it('should transfer token from one owner to another', async function () {
            let owner
            owner = await contract.ownerOf(1)
            console.log("🚀 ~ owner", owner)
            assert.equal(owner, accounts[0])
            
            await contract.approve(accounts[1], 1)
            await contract.transferFrom(accounts[0], accounts[1], 1)
            owner = await contract.ownerOf(1)
            console.log("🚀 ~ owner", owner)
            assert.equal(owner, accounts[1])
        })
    });
    
    describe('have ownership properties', function () {
        it('should fail when minting when address is not contract owner', async function () {
            let didError = false
            try {
                await contract.mint(accounts[5], 6, { from: accounts[1]})
            } catch (error) {
                didError = true
                console.log("🚀 ~ didError", didError)
            }
            assert.equal(didError, true)  
        })

        it('should return contract owner', async function () { 
            const owner = await contract.owner();
            console.log("🚀 ~ owner", owner)
            assert.equal(owner, accounts[0], );
        })
    });
})