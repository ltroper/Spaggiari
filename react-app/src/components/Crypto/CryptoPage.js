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
        <div className="body-portfolio">
            <div className="left-container-portfolio">
                <div className="crypto-name-pic-container">
                    <h1 className="crypto-page-big-name">{thisCrypto?.name}</h1>
                    <img className="big-crypto-image" src={thisCrypto?.image} />
                </div>
                <h2 className="crypto-page-big-price">${thisCrypto?.current_price}</h2>
            </div>
            <div className="right-container-crypto">
                <BuyCrypto thisCrypto={thisCrypto} />
                <AddCryptoToList thisCrypto={thisCrypto} />
            </div>
        </div>
    )
}

export default CryptoPage
