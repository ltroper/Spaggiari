import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import AddCash from "./addCash";
import CryptoPortfolio from "./portfolio";
import { getPortfolioThunk } from "../../store/portfolio";

import './portfolio.css'


const Portfolio = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        console.log("hello")
        dispatch(getPortfolioThunk(id));
    }, [dispatch]);

    const sessionUser = useSelector(state => state.session.user);
    const cryptoArr = useSelector(state => state.portfolio);
    const allCryptos = useSelector(state => state.crypto)


    const id = sessionUser.id


    let cryptoObj = {}
    let cryptoObjPricePaid = {}


    {
        if (cryptoArr?.length > 0) {
            cryptoArr.forEach(element => {
                if (cryptoObj[element.crypto_id] == null) {
                    cryptoObj[element.crypto_id] = element.quantity
                    cryptoObjPricePaid[element.crypto_id] = element.total_price
                }
                else {
                    cryptoObj[element.crypto_id] = parseFloat(cryptoObj[element.crypto_id]) + element.quantity
                    cryptoObjPricePaid[element.crypto_id] = parseFloat(cryptoObjPricePaid[element.crypto_id]) + element.total_price
                }
            });
        }
    }

    let totalCryptoMoney = 0
    Object.entries(cryptoObj).map(([key, value]) => (
        totalCryptoMoney += value * allCryptos[key]?.current_price
    ))

    let totalMoneyPaid = 0
    Object.entries(cryptoObjPricePaid).map(([key, value]) => (
        totalMoneyPaid += value
    ))

    let netProfit = totalCryptoMoney - totalMoneyPaid
    let netPercentage = ((totalCryptoMoney / totalMoneyPaid) * 100) - 100




    return (
        <div className="body-portfolio">
            <div className="left-container-portfolio">
                <h1 className="total-money-invested">${totalCryptoMoney.toFixed(2)}</h1>
                <p className={"net-percentage-" + (netPercentage > 0 ? "positive" : "negative")}>
                    ${netProfit.toFixed(2)}
                    {" "}
                    ({netPercentage.toFixed(2)}%)
                </p>
                <AddCash />
            </div>
            <div className="right-container-portfolio">
                <CryptoPortfolio cryptoObj={cryptoObj} cryptoObjPricePaid={cryptoObjPricePaid} />
            </div>
        </div>


    )
}

export default Portfolio
