
// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
const SolnSquareVerifier = artifacts.require('SolnSquareVerifier')
const proof1 = require('../zokrates/code/squareProofs/proof1')
const proof2 = require('../zokrates/code/squareProofs/proof2')

contract('SolnSquareVerifier', accounts => {
    let contract
    before('setup contract', async () => {
        console.log("🚀 ~ accounts", accounts.length)
        contract = await SolnSquareVerifier.new({from: accounts[0]});
    })
    

    it("Mint NFTs correctly", async function() {
        let totalSupply

        // Mint first NFT
        await contract.mintNFT(accounts[1], 1, proof1.proof, proof1.inputs)
        
        totalSupply = await contract.totalSupply()
        console.log("🚀 ~ totalSupply", totalSupply)
        assert.equal(totalSupply, 1)

        let balance
        balance = await contract.balanceOf(accounts[1])
        console.log("🚀 ~ balance", balance)
        assert.equal(balance, 1)

        // Fail to mint due to same proof being used more than once
        let didError = false;
        try {
            await contract.mintNFT(accounts[2], 2, proof1.proof, proof1.inputs)
        } catch (error) {
            didError = true
        }
        assert.equal(didError, true)  
        
        // Fail to mint due to wrong proof being provided
        didError = true;
        try {
            const wrongProof = {...proof2.proof}
            wrongProof.a = proof2.proof.a.map(address => address.replace('2', '1'))
            await contract.mintNFT(accounts[2], 2, wrongProof, proof2.inputs)
        } catch (error) {
            didError = true
        }
        assert.equal(didError, true)  
        
        // Mint second NFT
        await contract.mintNFT(accounts[2], 2, proof2.proof, proof2.inputs)
        totalSupply = await contract.totalSupply()
        console.log("🚀 ~ totalSupply", totalSupply)
        assert.equal(totalSupply, 2)

        balance = await contract.balanceOf(accounts[2])
        console.log("🚀 ~ balance", balance)
        assert.equal(balance, 1)
    })
})