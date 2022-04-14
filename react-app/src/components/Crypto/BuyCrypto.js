import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addToPortfolioThunk } from "../../store/portfolio";
import { updateUserThunk } from "../../store/user";
import { addTransactionThunk } from "../../store/transaction";


const BuyCrypto = ({ thisCrypto }) => {

    const dispatch = useDispatch()

    const [buying, setBuying] = useState(true)
    const [dollars, setDollars] = useState("dollar")
    const [investment, setInvestment] = useState()

    const sessionUser = useSelector(state => state.session.user);
    const userWithCash = useSelector(state => state.user[1]?.cash)

    let cashBalance

    if (userWithCash > 0) {
        cashBalance = userWithCash
    }
    else {
        cashBalance = sessionUser.cash
    }

    const handleBuySubmit = (e) => {
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
        dispatch(addToPortfolioThunk(portfolio))
        dispatch(addTransactionThunk(transaction))
    }

    const handleBuySubmitCrypto = (e) => {
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
        dispatch(addToPortfolioThunk(portfolio))
        dispatch(addTransactionThunk(transaction))
    }


    return (
        <div>
            <button onClick={e => setBuying(true)}>Buy {thisCrypto?.symbol}</button>
            <button onClick={e => setBuying(false)}>Sell {thisCrypto?.symbol}</button>
            {buying &&
                <div>
                    <select onChange={e => setDollars(e.target.value)}>
                        Invest in
                        <option value="dollar">Dollars</option>
                        <option value="crypto">Crypto</option>
                    </select>
                    <div>
                        {dollars === "dollar" &&
                            <form onSubmit={handleBuySubmit}>
                                <label>Amount
                                    <input
                                        type="number"
                                        min="0"
                                        max={cashBalance}
                                        placeholder="$0.00"
                                        value={investment}
                                        onChange={e => setInvestment(e.target.value)}
                                        required
                                    />
                                </label>
                                <label>Est. Quantity
                                    <div>
                                        {investment > 0 &&
                                            <p>
                                                {investment / thisCrypto?.current_price}{" "}{thisCrypto?.symbol}
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
                        {dollars === "crypto" &&
                            <form onSubmit={handleBuySubmitCrypto}>
                                <label>Amount
                                    <input
                                        type="number"
                                        min="0"
                                        max={cashBalance / thisCrypto?.current_price}
                                        value={investment}
                                        onChange={e => setInvestment(e.target.value)}
                                        required
                                    />
                                </label>
                                <label>Est. Dollars
                                    <div>
                                        {investment > 0 &&
                                            <p>
                                                {"$"}{investment * thisCrypto?.current_price}
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
            }
            {!buying &&
                <div>
                    <select onChange={e => setDollars(e.target.value)}>
                        Invest in
                        <option value="dollar">Dollars</option>
                        <option value="crypto">Crypto</option>
                    </select>
                    <div>
                        {dollars === "dollar" &&
                            <form>
                                <label>Amount
                                    <input
                                        type="number"
                                        min="0"
                                        max={cashBalance}
                                        value={investment}
                                        onChange={e => setInvestment(e.target.value)}
                                        required
                                    />
                                </label>
                                <label>Est. Quantity
                                    <input
                                        type="number"
                                        value={investment / thisCrypto.current_price}
                                    />
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
            }
        </div>
    )
}

export default BuyCrypto
