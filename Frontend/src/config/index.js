let key ={};

if(process.env.NODE_ENV == "production"){
    key={
        BACKENDURL: "http://localhost:2056/v1/",
        TokenContract: "0x4c25985A00b89B48363e4f868484796c5E219F07",
        Txurl: "https://testnet.bscscan.com/tx/",

    }
}else{
    key ={
        BACKENDURL: "http://localhost:2056/v1/",
        TokenContract: "0x4c25985A00b89B48363e4f868484796c5E219F07",
        Txurl: "https://testnet.bscscan.com/tx/",

    }

}

export default key;