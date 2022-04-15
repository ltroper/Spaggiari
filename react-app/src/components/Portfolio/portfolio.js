import React from "react";
import { useSelector, useDispatch } from "react-redux";

import './portfolio.css'
import Watchlist from "./Watchlist";

const CryptoPortfolio = ({ cryptoObj, cryptoObjPricePaid }) => {

    const allCryptos = useSelector(state => state.crypto)



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
                            <p className={"net-percentage-" + (((((
                                value * allCryptos[key]?.current_price)
                                / cryptoObjPricePaid[key])
                                * 100) - 100) > 0 ? "positive" : "negative")}>
                                {((((
                                    value * allCryptos[key]?.current_price)
                                    / cryptoObjPricePaid[key])
                                    * 100) - 100).toFixed(2)}%
                            </p>
                        </div>
                    </div>
                ))
                }
            </div>
            <Watchlist />
        </div>
    )
}

export default CryptoPortfolio
