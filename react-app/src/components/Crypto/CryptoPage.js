import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import BuyCrypto from "./BuyCrypto";
import AddCryptoToList from "./AddCryptoToList";
import CrytpoGraph from "./CryptoGraph";

import { getAllNewsThunk } from "../../store/news";


const CryptoPage = () => {

    const dispatch = useDispatch()

    const cryptoId = useParams()
    const cryptoObj = useSelector(state => state.crypto)

    const thisCrypto = cryptoObj[cryptoId.cryptoId]
    const cryptoProp = thisCrypto?.id

    const allNews = useSelector(state => state.news)
    const allNewsArr = Object.values(allNews)

    const smolNewsArr = allNewsArr.slice(0, 8)

    useEffect(() => {
        dispatch(getAllNewsThunk(thisCrypto?.id))
    }, [dispatch, thisCrypto?.id])

    return (
        <div className="body-portfolio">
            <div className="left-container-portfolio">
                <div className="crypto-name-pic-container">
                    <h1 className="crypto-page-big-name">{thisCrypto?.name}</h1>
                    <img className="big-crypto-image" src={thisCrypto?.image} />
                </div>
                <h2 className="crypto-page-big-price">${thisCrypto?.current_price}</h2>
                <CrytpoGraph cryptoProp={cryptoProp} />
                <div>
                    {smolNewsArr?.map(news => (
                        <a href={news.url}>
                            <div className="individual-news-container">
                                <div className="news-left">
                                    <img className="news-image" src={news.urlToImage} />
                                </div>
                                <div className="news-right">
                                    <h3 className="news-title">{news.title}</h3>
                                    <p className="news-description">{news.description}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
            <div className="right-container-crypto">
                <BuyCrypto thisCrypto={thisCrypto} />
                <AddCryptoToList thisCrypto={thisCrypto} />
            </div>
        </div>
    )
}

export default CryptoPage
