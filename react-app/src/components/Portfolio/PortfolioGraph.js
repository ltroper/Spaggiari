import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Plot from 'react-plotly.js';
import { set } from 'express/lib/application';

const PortfolioGraph = ( { cryptoObj } ) => {


    const [cryptoDatePrice, setCryptoDatePrice] = useState([])

    const constructPortfolioHistory = async (cryptoObj) => {
        let historyArr = []

        const today = ((new Date().getTime()) / 1000) - 3600
        const aMonthAgo = (today - 2678400) - 3600


        for (let [name, amount] of Object.entries(cryptoObj)) {

            let res = await fetch(`https://api.coingecko.com/api/v3/coins/${name}/market_chart/range?vs_currency=usd&from=${aMonthAgo}&to=${today}`)
            const cryptoHistory = await res.json();

            const cryptoPrices = await cryptoHistory.prices.map(value => {
                return [value[0], value[1]*amount]
            })
            historyArr.push(cryptoPrices)

            }

            return historyArr


    }



    // useEffect(() => {
    //     let newArr = []
    //     cryptoData?.forEach(element => {
    //         let dateObj = (new Date(element[0]))
    //         newArr.push([`${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getHours()}h`, element[1]])
    //     });
    //     setCryptoDatePrice(newArr)
    // }, [dispatch, cryptoData])



    // let xArray = []
    // let yArray = []

    // cryptoDatePrice?.forEach(element => {
    //     xArray.push(element[0])
    //     yArray.push(element[1])
    // })

    return(
        <Plot />
    )
}

export default PortfolioGraph
