import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addToPortfolioThunk } from "../../store/portfolio";
import { updateUserThunk } from "../../store/user";
import { addTransactionThunk } from "../../store/transaction";
import { useHistory } from "react-router-dom";

import { getPortfolioThunk } from "../../store/portfolio";

import './cryptoPage.css'

const BuyCrypto = ({ thisCrypto }) => {

    const history = useHistory()

    const dispatch = useDispatch()

    const [buying, setBuying] = useState(true)
    const [dollars, setDollars] = useState("dollar")
    const [investment, setInvestment] = useState()
    const [investmentCrypto, setInvestmentCrypto] = useState()
    console.log(investment)

    const sessionUser = useSelector(state => state.session.user);
    const userWithCash = useSelector(state => state.user[sessionUser?.id]?.cash)
    const cryptoArr = useSelector(state => state.portfolio);

    const id = sessionUser.id

    let cashBalance

    if (userWithCash > 0) {
        cashBalance = userWithCash
    }
    else {
        cashBalance = sessionUser.cash
    }

    async function handleBuySubmit(e) {
        e.preventDefault();
        let user = {
            id: sessionUser.id,
            cash: -investment
        };

        let portfolio = {
            crypto_id: thisCrypto.id,
            user_id: sessionUser.id,
            total_price: investment,
            quantity: investment / thisCrypto.current_price
        }

        let transaction = {
            crypto_id: thisCrypto.id,
            user_id: sessionUser.id,
            type: "buy",
            price: investment,
            quantity: investment / thisCrypto.current_price
        }

        dispatch(updateUserThunk(user))
        await dispatch(addToPortfolioThunk(portfolio))
        await dispatch(addTransactionThunk(transaction))
        history.push("/")

    }

    async function handleBuySubmitCrypto(e) {
        e.preventDefault();
        let user = {
            id: sessionUser.id,
            cash: -investmentCrypto
        };

        let portfolio = {
            crypto_id: thisCrypto.id,
            user_id: sessionUser.id,
            total_price: investmentCrypto,
            quantity: investmentCrypto / thisCrypto.current_price
        }

        let transaction = {
            crypto_id: thisCrypto.id,
            user_id: sessionUser.id,
            type: "buy",
            price: investmentCrypto,
            quantity: investmentCrypto / thisCrypto.current_price
        }

        dispatch(updateUserThunk(user))
        await dispatch(addToPortfolioThunk(portfolio))
        await dispatch(addTransactionThunk(transaction))
        history.push("/")

    }

    async function handleSellSubmit(e) {
        e.preventDefault();

        let user = {
            id: sessionUser?.id,
            cash: investment
        };

        let portfolio = {
            crypto_id: thisCrypto?.id,
            user_id: sessionUser?.id,
            total_price: -investment,
            quantity: -(investment / thisCrypto?.current_price)
        }

        let transaction = {
            crypto_id: thisCrypto?.id,
            user_id: sessionUser?.id,
            type: "sell",
            price: investment,
            quantity: investment / thisCrypto?.current_price
        }

        dispatch(updateUserThunk(user))
        await dispatch(addToPortfolioThunk(portfolio))
        await dispatch(addTransactionThunk(transaction))
        history.push("/")
    }

    async function handleSellSubmitCrypto(e) {

        e.preventDefault();

        let user = {
            id: sessionUser?.id,
            cash: investmentCrypto
        };

        let portfolio = {
            crypto_id: thisCrypto?.id,
            user_id: sessionUser?.id,
            total_price: -(investmentCrypto),
            quantity: -investmentCrypto / thisCrypto?.current_price
        }

        let transaction = {
            crypto_id: thisCrypto?.id,
            user_id: sessionUser?.id,
            type: "sell",
            price: investmentCrypto,
            quantity: investmentCrypto / thisCrypto?.current_price
        }

        dispatch(updateUserThunk(user))
        await dispatch(addToPortfolioThunk(portfolio))
        await dispatch(addTransactionThunk(transaction))
        history.push("/")
    }


    useEffect(() => {
        dispatch(getPortfolioThunk(id));
    }, [dispatch]);

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

    const toggleAsset = e => {
        setDollars(e.target.value)
        setInvestment()
    }


    return (
        <div>
            <div className="specific-crypto-header">
                <button onClick={e => setBuying(true)} className={"buy-sell-button buy-sell-buttons-" + (buying ? "active" : "not")}>Buy {thisCrypto?.symbol}</button>
                <button onClick={e => setBuying(false)} className={"buy-sell-button buy-sell-buttons-" + (buying ? "not" : "active")}>Sell {thisCrypto?.symbol}</button>
            </div>
            <div>
                <div className="invest-in-container">
                    <p>Invest in</p>
                    <select
                        className="buy-crypto-select-menu"
                        onChange={toggleAsset}>
                        <option value="dollar">Dollars</option>
                        <option value="crypto">Crypto</option>
                    </select>
                </div>
                <div>
                    {dollars === "dollar" &&
                        <form onSubmit={buying ? handleBuySubmit : handleSellSubmit}>
                            <div className="amount-container">
                                <label className="invest-in-container">Amount
                                    <input
                                        className="buy-crypto-input-menu"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        max={buying ? cashBalance : (cryptoObj[thisCrypto.id] * thisCrypto.current_price)-0.01}
                                        placeholder="$0.00"
                                        value={investment}
                                        onChange={e => setInvestment(e.target.value)}
                                        required
                                    />
                                </label>
                                <div className="amount-container-border"></div>
                            </div>
                            {buying && <label className="invest-in-container estimated-label"> Available cash
                                <div>
                                    <p>
                                        ${(cashBalance?.toFixed(2))}
                                    </p>
                                </div>
                            </label>}
                            {!buying && <label className="invest-in-container estimated-label"> Available {thisCrypto.symbol}
                                <div>
                                    <p>
                                        {(cryptoObj[thisCrypto?.id]?.toFixed(5))}
                                    </p>
                                </div>
                            </label>}
                            <label className="invest-in-container estimated-label">Est. Quantity
                                <div>
                                    {investment > 0 ?
                                        <p>
                                            {(investment / thisCrypto?.current_price).toFixed(5)}{" "}{thisCrypto?.symbol}
                                        </p>
                                        : 0
                                    }
                                </div>
                            </label>
                            <div className="buy-crypto-button-container">
                                <button
                                    type="submit"
                                    className="buy-crypto-button"
                                >
                                    Submit
                                </button>
                            </div>

                        </form>
                    }
                    {dollars === "crypto" &&
                        <form onSubmit={buying ? handleBuySubmitCrypto : handleSellSubmitCrypto}>
                            <div className="amount-container">
                                <label className="invest-in-container">Amount
                                    <input
                                        className="buy-crypto-input-menu"
                                        type="number"
                                        step="0.0001"
                                        min="0"
                                        max={buying ? (cashBalance / thisCrypto?.current_price)-0.0001 : (cryptoObj[thisCrypto.id])-0.0001}
                                        value={investment}
                                        onChange={e => setInvestmentCrypto((e.target.value * thisCrypto?.current_price).toFixed(2))}
                                        required
                                    />
                                </label>
                                <div className="amount-container-border"></div>
                            </div>
                            {buying && <label className="invest-in-container estimated-label"> Available cash
                                <div>
                                    <p>
                                        ${(cashBalance?.toFixed(2))}
                                    </p>
                                </div>
                            </label>}
                            {!buying && <label className="invest-in-container estimated-label"> Available {thisCrypto.symbol}
                                <div>
                                    <p>
                                        {(cryptoObj[thisCrypto?.id]?.toFixed(5))}
                                    </p>
                                </div>
                            </label>}

                            <label className="invest-in-container estimated-label">Est. Dollars
                                <div>
                                    {investmentCrypto > 0 ?
                                        <p>
                                            ${(investmentCrypto)}
                                        </p>
                                        : 0
                                    }
                                </div>
                            </label>
                            <div className="buy-crypto-button-container">
                                <button
                                    type="submit"
                                    className="buy-crypto-button"
                                >
                                    Submit
                                </button>
                            </div>

                        </form>


                    }
                </div>
            </div>
        </div>
    )
}

export default BuyCrypto
