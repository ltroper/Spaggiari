import { all } from "express/lib/application";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import './portfolio.css'

const CryptoPortfolio = ({ cryptoObj }) => {

    const allCryptos = useSelector(state => state.crypto)

    console.log(cryptoObj)






    return (
        <div>
            <div className="portfolio-crypto-header-container">
                <h4 className="portfolio-crypto-header">Cryptos</h4>
            </div>
            <div className="portfolio-crypto-coins-container">
                {Object.entries(cryptoObj).map(([key, value]) => (
                    <div className="portfolio-individual-coin-container">
                        <div className="portfolio-individual-coin-left">
                            <p className="small-crypto-symbol">{allCryptos[key]?.symbol.toUpperCase()}</p>
                            <p className="small-crypto-values">{value.toFixed(5)}</p>
                        </div>
                        <div className="portfolio-individual-coin-right">
                            <p className="small-crypto-values">${(value * allCryptos[key]?.current_price).toFixed(2)}</p>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default CryptoPortfolio
