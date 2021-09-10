pragma experimental ABIEncoderV2;
pragma solidity ^0.5.5;

import "./ZokratesVerifier.sol";
import "./ERC721Mintable.sol";

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is Verifier, CustomERC721Token {

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint index;
        address owner;
    }

    // TODO define an array of the above struct
    Solution[] solutions;


    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => address) uniqueSolutions;



    // TODO Create an event to emit when a solution is added
    event NewSolution(address, uint);


    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(address owner) internal {
        Solution memory newSolution = Solution(solutions.length, owner);
        solutions.push(newSolution);
        emit NewSolution(msg.sender, solutions.length);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintNFT(address owner, uint id, Proof memory proof, uint[2] memory input) public returns ( bool ) {
        require(verifyTx(proof, input), "Sorry, you need to provide proof of ownership.");
        // bytes memory solutionHash = abi.encodePacked(uint[input[0], input[1], proof.a[0]]);

        bytes32 solutionHash = keccak256(abi.encodePacked(input, proof.a.X, proof.a.Y, proof.b.X, proof.b.Y, proof.c.X, proof.c.Y));
        
        require(uniqueSolutions[solutionHash] == address(0), "Sorry, not a unique solution");
        uniqueSolutions[solutionHash] = owner;

        addSolution(owner);
       
        bool minted = mint(owner, id);

        return minted;
    }
}








  


























