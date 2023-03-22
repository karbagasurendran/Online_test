let key = {};

if (process.env.NODE_ENV === "production") {
    key = {
        PORT: 2056,
        SECRETORKEY:"etaergniarusedoc",
        SALTROUND: 10,
        DATABASE_URL:"mongodb+srv://karbagasurendran:bFKIXOK22ZfcGyL3@cluster0.n1z3n9a.mongodb.net/?retryWrites=true&w=majority",
        TokenContract: "0x4c25985A00b89B48363e4f868484796c5E219F07",
        RPCURL: "https://data-seed-prebsc-1-s3.binance.org:8545/",
        AdminAddress: "0xf460D050aA16665B8B854f3706A7ac74AAd64213",
        PrivateKey: "e203dc57b4946ff3d360e1840f31074971f9af47b384976110b04efa9c798921",
    }
} else {
    key = {
        PORT: 2056,
        SECRETORKEY:"etaergniarusedoc",
        SALTROUND: 10,
        DATABASE_URL:"mongodb+srv://karbagasurendran:bFKIXOK22ZfcGyL3@cluster0.n1z3n9a.mongodb.net/?retryWrites=true&w=majority",
        TokenContract: "0x4c25985A00b89B48363e4f868484796c5E219F07",
        RPCURL: "https://data-seed-prebsc-1-s3.binance.org:8545/",
        AdminAddress: "0xf460D050aA16665B8B854f3706A7ac74AAd64213",
        PrivateKey: "e203dc57b4946ff3d360e1840f31074971f9af47b384976110b04efa9c798921",

    }
}

export default key;

// bFKIXOK22ZfcGyL3
