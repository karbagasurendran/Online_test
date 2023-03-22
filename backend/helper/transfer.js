import config from "../config/index";
import TokenABI from "../ABI/TokenABI.json"
import Web3 from "web3";

async function transferToken(amount, address) {

    try {

        var web3 = new Web3(config.RPCURL);
        var contract = new web3.eth.Contract(TokenABI, config.TokenContract, { from: config.AdminAddress });
        var decimals = await contract.methods.decimals();

        var transferAmt = parseFloat(amount) * parseFloat(10 ** 18);

        var data = await contract.methods.transfer(address, transferAmt.toString()).encodeABI(); //Create the data for token transaction.

        var rawTransaction = { "to": config.TokenContract, "gas": 100000, "data": data };
        var signedTx = await web3.eth.accounts.signTransaction(rawTransaction, config.PrivateKey);
        var txid = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        return {
            txid: (txid && txid.transactionHash) ? txid.transactionHash : ""
        }
    } catch (err) {
        return {
            txid: ""
        }

    }
}

export default transferToken;