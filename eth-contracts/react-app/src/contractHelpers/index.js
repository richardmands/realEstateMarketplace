import * as proofs from "../squareProofs"

export async function mintNFT({
  instance,
  id,
  nftId,
  owner,
  gasLimit,
  gasPrice,
  onCompletion,
}) {
  console.log("🚀 ~ instance", instance)
  console.log("🚀 ~ id", id)
  console.log("🚀 ~ proofs", proofs)
  const proofstring = `proof${nftId}`
  console.log("🚀 ~ proofstring", proofstring)
  try {
    const { proof, inputs } = proofs[proofstring]
    console.log("🚀 ~ proof, inputs", proof, inputs)
    await instance.methods.mintNFT(owner, nftId, proof, inputs).send({
      from: id,
      value: 0,
      gasPrice,
      gasLimit,
    })
  } catch (error) {
    console.log("🚀 ~ error", error)
  }

  onCompletion()
}
