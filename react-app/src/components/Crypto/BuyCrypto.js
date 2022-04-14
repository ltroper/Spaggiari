import React, { useState } from "react";
import { useSelector } from "react-redux";

const BuyCrypto = ({ thisCrypto }) => {


    const [buying, setBuying] = useState(true)
    const [dollars, setDollars] = useState("dollar")
    const [investment, setInvestment] = useState(0)

    const sessionUser = useSelector(state => state.session.user);
    const userWithCash = useSelector(state => state.user[1]?.cash)

    let cashBalance

    if (userWithCash > 0) {
        cashBalance = userWithCash
    }
    else {
        cashBalance = sessionUser.cash
    }

    const handleSubmit = () => {
        return
    }


    return (
        <div>
            <button onClick={e => setBuying(true)}>Buy {thisCrypto.name}</button>
            <button onClick={e => setBuying(false)}>Sell {thisCrypto.name}</button>
            {buying &&
                <div>
                    <select onChange={e => setDollars(e.target.value)}>
                        Invest in
                        <option value="dollar">Dollars</option>
                        <option value="crypto">Crypto</option>
                    </select>
                    <div>
                        {dollars === "dollar" &&
                        <form onSubmit={handleSubmit}>
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
                                value={investment/thisCrypto.current_price}
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
            {!buying &&
                <div>
                <select onChange={e => setDollars(e.target.value)}>
                    Invest in
                    <option value="dollar">Dollars</option>
                    <option value="crypto">Crypto</option>
                </select>
                <div>
                    {dollars === "dollar" &&
                    <form onSubmit={handleSubmit}>
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
                            value={investment/thisCrypto.current_price}
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
