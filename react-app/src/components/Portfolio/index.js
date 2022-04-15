import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import AddCash from "./addCash";
import CryptoPortfolio from "./portfolio";
import { getPortfolioThunk } from "../../store/portfolio";

import './portfolio.css'


const Portfolio = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPortfolioThunk(id));
    }, [dispatch]);

    const sessionUser = useSelector(state => state.session.user);
    const cryptoArr = useSelector(state => state.portfolio);
    const allCryptos = useSelector(state => state.crypto)


    const id = sessionUser.id


    let cryptoObj = {}


    {
        if (cryptoArr?.length > 0) {
            cryptoArr.forEach(element => {
                if (cryptoObj[element.crypto_id] == null) {
                    cryptoObj[element.crypto_id] = element.quantity
                }
                else {
                    cryptoObj[element.crypto_id] = parseFloat(cryptoObj[element.crypto_id]) + element.quantity
                }
            });
        }
    }

    let totalCryptoMoney = 0
    Object.entries(cryptoObj).map(([key, value]) => (
        totalCryptoMoney += value * allCryptos[key]?.current_price
    ))






    return (
        <div className="body-portfolio">
            <div className="left-container-portfolio">
                <h1>${totalCryptoMoney.toFixed(2)}</h1>
                <AddCash />
            </div>
            <div className="right-container-portfolio">
                <CryptoPortfolio cryptoObj={cryptoObj} />
            </div>
        </div>


    )
}

export default Portfolio
