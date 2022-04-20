import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Plot from 'react-plotly.js';
import { set } from 'express/lib/application';

const PortfolioGraph = ( { cryptoObj } ) => {


    const [cryptoDatePrice, setCryptoDatePrice] = useState([])


    //first try, don't know how to get value out of promise. Used .then but sooo stubborn

    // const constructPortfolioHistory = async (cryptoObj) => {
    //     let historyArr = []

    //     const today = ((new Date().getTime()) / 1000) - 3600
    //     const aMonthAgo = (today - 2678400) - 3600


    //     for (let [name, amount] of Object.entries(cryptoObj)) {

    //         let res = await fetch(`https://api.coingecko.com/api/v3/coins/${name}/market_chart/range?vs_currency=usd&from=${aMonthAgo}&to=${today}`)
    //         const cryptoHistory = await res.json();

    //         const cryptoPrices = await cryptoHistory.prices.map(value => {
    //             return [value[0], value[1]*amount]
    //         })
    //         historyArr.push(cryptoPrices)

    //         }

    //         return historyArr


    // }




    //another try, won't work



    // let historyArr = []

    // useEffect(() => {

    //     const today = ((new Date().getTime()) / 1000) - 3600
    //     const aMonthAgo = (today - 2678400) - 3600
    //     for (let [name, amount] of Object.entries(cryptoObj)) {

    //         let res = await fetch(`https://api.coingecko.com/api/v3/coins/${name}/market_chart/range?vs_currency=usd&from=${aMonthAgo}&to=${today}`)
    //         const cryptoHistory = await res.json();

    //         const cryptoPrices = cryptoHistory.prices.map(value => {
    //             return [value[0], value[1]*amount]
    //         })
    //         historyArr.push(cryptoPrices)

    //         }

    //         return historyArr
    // })

    // console.log(historyArr)

    return(
        <Plot />
    )
}

export default PortfolioGraph
