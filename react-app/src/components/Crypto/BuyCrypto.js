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

    const sessionUser = useSelector(state => state.session.user);
    const userWithCash = useSelector(state => state.user[1]?.cash)
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
            cash: -investment
        };

        let portfolio = {
            crypto_id: thisCrypto.id,
            user_id: sessionUser.id,
            total_price: investment * thisCrypto.current_price,
            quantity: investment
        }

        let transaction = {
            crypto_id: thisCrypto.id,
            user_id: sessionUser.id,
            type: "buy",
            price: investment * thisCrypto.current_price,
            quantity: investment
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
            cash: investment
        };

        let portfolio = {
            crypto_id: thisCrypto?.id,
            user_id: sessionUser?.id,
            total_price: -(investment * thisCrypto?.current_price),
            quantity: -investment
        }

        let transaction = {
            crypto_id: thisCrypto?.id,
            user_id: sessionUser?.id,
            type: "sell",
            price: investment * thisCrypto?.current_price,
            quantity: investment
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
                        onChange={e => setDollars(e.target.value)}>
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
                                        max={buying ? cashBalance : cryptoObj[thisCrypto.id] * thisCrypto.current_price}
                                        placeholder="$0.00"
                                        value={investment}
                                        onChange={e => setInvestment(e.target.value)}
                                        required
                                    />
                                </label>
                                <div className="amount-container-border"></div>
                            </div>
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
                            <label>Amount
                                <input
                                    type="number"
                                    min="0"
                                    max={buying ? (cashBalance / thisCrypto?.current_price) : cryptoObj[thisCrypto.id]}
                                    value={investment}
                                    onChange={e => setInvestment(e.target.value)}
                                    required
                                />
                            </label>
                            <label>Est. Dollars
                                <div>
                                    {investment > 0 &&
                                        <p>
                                            ${(investment * thisCrypto?.current_price).toFixed(2)}
                                        </p>
                                    }
                                </div>
                            </label>
                            <button
                                type="submit"
                            >
                                Submit
                            </button>

                        </form>


                    }
                </div>
            </div>
        </div>
    )
}

export default BuyCrypto
