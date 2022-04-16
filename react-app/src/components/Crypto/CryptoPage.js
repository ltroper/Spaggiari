import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import BuyCrypto from "./BuyCrypto";
import AddCryptoToList from "./AddCryptoToList";

const CryptoPage = () => {


    const cryptoId = useParams()
    const cryptoObj = useSelector(state => state.crypto)

    const thisCrypto = cryptoObj[cryptoId.cryptoId]

    return (
        <div>
            <h1>{thisCrypto?.name}</h1>
            <h2>${thisCrypto?.current_price}</h2>
            <BuyCrypto thisCrypto={thisCrypto}/>
            <AddCryptoToList thisCrypto={thisCrypto}/>
        </div>
    )
}

export default CryptoPage
