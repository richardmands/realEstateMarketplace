import React, { useState } from "react"
import Loader from "react-loader-spinner"
import { ToastContainer, toast } from "react-toastify"

import "bootstrap/dist/css/bootstrap.min.css"
import "react-toastify/dist/ReactToastify.css"
import "./App.scss"

import useWeb3 from "./hooks/useWeb3"
import useContract from "./hooks/useContract"
import CapstoneContract from "./contracts/SolnSquareVerifier.json"
import { mintNFT } from "./contractHelpers"
import { FormItem } from "./FormItem"

import logo from "./plane.png"

const makeToast = (text, happy) => {
  const options = {
    position: "top-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  }

  return happy ? toast.success(text, options) : toast.error(text, options)
}

function App() {
  const [loading, setLoading] = useState(false)
  const [web3, accounts, gasPrice, gasLimit] = useWeb3(
    { amount: "5", unit: "shannon" },
    { amount: "5", unit: "lovelace" }
  )

  const account = (accounts && accounts[0]) || ""

  const [instance, contractURI] = useContract({
    web3,
    smartContract: CapstoneContract,
    gasPrice,
    gasLimit,
    onSuccess: () => {
      makeToast(`...${account.substr(-4)} connected to Smart Contract`, ":)")
    },
    onFailure: () => makeToast("Failed to connect to Smart Contract :("),
  })

  const [owner, setOwner] = useState("")
  const [id, setId] = useState("")

  function handleMintNFT() {
    setLoading(true)
    mintNFT({
      instance,
      id: account,
      owner,
      nftId: id,
      gasLimit,
      gasPrice,
      onCompletion: () => {
        makeToast("NFT Created!", ":)")
        setLoading(false)
      },
    })
  }

  return (
    <div className="App">
      <ToastContainer />

      <header className="App-header">
        <div className="App-logoContainer">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p>
          Capstone <br /> Richard Mands <br />
          Udacity Blockchain Nanodegree
        </p>
        <p className="explanation">
          See the code on{" "}
          <a
            href="https://github.com/richardmands/realEstateMarketplace"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </p>
        {contractURI ? (
          <p className="explanation">
            Deployed on Rinkeby Test Network <br />
            <a
              href={`https://rinkeby.etherscan.io/address/${contractURI}`}
              target="_blank"
              rel="noreferrer"
            >
              {contractURI}
            </a>
          </p>
        ) : (
          <p className="explanation">
            Not connected to smart contract. Make sure you have MetaMask
            installed and you're on the Rinkeby Test Network.
          </p>
        )}
      </header>

      {loading ? (
        <div className="LoaderFullScreen">
          <Loader
            type="Grid"
            color="#00BFFF"
            height={100}
            width={100}
            style={{ paddingTop: "20px", margin: "auto" }}
          />
        </div>
      ) : null}

      <div className="statuses">
        <div
          className={`contractStatus ${
            instance ? "operational" : "notOperational"
          }`}
        >
          Contract: {`${instance ? "Operational" : "Not Operational"}`}
        </div>
      </div>

      {web3 && accounts?.length ? (
        <div className="section">
          <h2>Mint NFT</h2>
          <form
            className="form"
            onSubmit={(event) => {
              event.preventDefault()
              handleMintNFT()
            }}
          >
            <FormItem
              name="owner"
              label="NFT Owner"
              value={owner}
              onChange={setOwner}
            />
            <FormItem name="id" label="NFT Id" value={id} onChange={setId} />

            <div className="buttons">
              <button className="button submitButton" type="submit">
                <span className="buttonText">Mint NFT</span>
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  )
}

export default App
