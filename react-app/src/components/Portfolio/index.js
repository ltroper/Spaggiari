import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import AddCash from "./addCash";
import CryptoPortfolio from "./portfolio";
import PortfolioGraph from "./PortfolioGraph";
import { getPortfolioThunk } from "../../store/portfolio";
import { getAllNewsThunk } from "../../store/news";

import './portfolio.css'


const Portfolio = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPortfolioThunk(id));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllNewsThunk("crypto"))
    }, [dispatch])

    const sessionUser = useSelector(state => state.session.user);
    const cryptoArr = useSelector(state => state.portfolio);
    const allCryptos = useSelector(state => state.crypto)
    const allNews = useSelector(state => state.news)
    const allNewsArr = Object.values(allNews)

    const smolNewsArr = allNewsArr.slice(0, 8)


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

    let netProfit = (totalCryptoMoney - totalMoneyPaid).toFixed(2).replace('-0', '0')
    let netPercentage = (((totalCryptoMoney / totalMoneyPaid) * 100) - 100).toFixed(2)



    return (
        <div className="body-portfolio">
            <div className="left-container-portfolio">
                <h1 className="total-money-invested">${totalCryptoMoney.toFixed(2) > 0.5 ? totalCryptoMoney.toFixed(2) : "0"}</h1>
                <p className={"net-percentage-" + (netPercentage >= 0 ? "positive" : "negative")}>
                    ${netProfit}
                    {" "}
                    ({netProfit == 0 ? "0" : netPercentage }%)
                </p>
                <PortfolioGraph totalCryptoMoney={totalCryptoMoney}/>
                <AddCash />
                <div>
                    {smolNewsArr?.map(news => (
                        <a href={news.url}>
                            <div className="individual-news-container">
                                <div className="news-left">
                                    <img className="news-image" src={news.image} />
                                </div>
                                <div className="news-right">
                                    <h3 className="news-title">{news.headline}</h3>
                                    <p className="news-description">{news.summary}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
            <div className="right-container-portfolio">
                <CryptoPortfolio cryptoObj={cryptoObj} cryptoObjPricePaid={cryptoObjPricePaid} />
            </div>
        </div>


    )
}

export default Portfolio
