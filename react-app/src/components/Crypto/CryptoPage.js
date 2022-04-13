import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CryptoPage = () => {


    const cryptoId = useParams()
    const cryptoObj = useSelector(state => state.crypto)

    const thisCrypto = cryptoObj[cryptoId.cryptoId]

    console.log(cryptoObj)
    console.log(cryptoId.cryptoId)
    console.log(thisCrypto)

    return (
        <h1>{thisCrypto.name}</h1>
    )
}

export default CryptoPage
