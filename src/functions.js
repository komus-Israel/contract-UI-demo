import Web3 from "web3";
import { loadConnectedAddressAction, loadWeb3Action, loadAbiAction, checkWalletConnectionAction } from "./actions/action";

export const loadWeb3=(dispatch)=>{

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    dispatch(loadWeb3Action(web3))
    return web3

}

export const loadAddress=async(dispatch, web3)=>{

    const address = await web3.eth.getAccounts()


    if ( address.length > 0 ) {
        dispatch(loadConnectedAddressAction(address[0]))
        return address[0]
    }

}

export const connectWallet=async(dispatch, web3)=>{
    const { ethereum } = window

    if(ethereum.isMetaMask) {
        console.log(ethereum)
        const connect = await ethereum.request({method: 'eth_requestAccounts'})
        
    }
    
    const accountFromWeb3 = await web3.eth.getAccounts()

    if (accountFromWeb3.length > 0) {
        dispatch(loadConnectedAddressAction(accountFromWeb3[0]))
        dispatch(checkWalletConnectionAction(true))
        return accountFromWeb3[0]
    }
}

export const loadAbi= (dispatch)=>{

    const tokenJson = require("./contractAbi/ERC1400.json")
    const abi = tokenJson
    dispatch(loadAbiAction(abi))
    return abi
}

export const checkWalletConnection = async(dispatch)=>{

    const { ethereum } = window 
    const accounts = await ethereum.request({method: 'eth_accounts'})
    
    if ( accounts.length > 0 ) {
        dispatch(checkWalletConnectionAction(true))
    }

}

/*export const loadTokenData=async(dispatch, web3)=>{



}*/

export const loadContract=async(web3, dispatch)=>{
    const abi = loadAbi(dispatch)
    const networkID = await web3.eth.net.getId()
    const contractAddress = abi.networks[networkID].address     // get the contract address

    const contract = new web3.eth.Contract(abi.abi, contractAddress)
    console.log(contract)
    
}