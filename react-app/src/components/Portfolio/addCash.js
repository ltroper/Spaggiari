import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserThunk } from '../../store/user';

import './portfolio.css'


const AddCash = ({ }) => {

    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user);
    const userWithCash = useSelector(state => state.user[sessionUser.id]?.cash)

    let cashBalance

    if (userWithCash > 0) {
        cashBalance = userWithCash
    }
    else {
        cashBalance = sessionUser.cash
    }

    const [addCash, setAddCash] = useState(false)
    const [deposit, setDeposit] = useState(0)



    const handleSubmit = e => {
        e.preventDefault();
        let user = {
            id: sessionUser.id,
            cash: deposit
        };

        dispatch(updateUserThunk(user))
        setAddCash(false)
        setDeposit(0)

    }


    return (
        <div className='add-cash-container'>
            <div className='add-cash-left-container'>
                <h3>Cash Balance:</h3>
                <h3 className='add-cash-total-cash'>${cashBalance?.toFixed(2)}</h3>
            </div>
            <div>
                {!addCash &&
                    <button
                        onClick={e => setAddCash(true)}
                    >Add Cash</button>}
                {addCash &&
                    <form onSubmit={handleSubmit}>
                        <label>
                            <input
                                className="add-cash-input"
                                placeholder='Enter amount in USD'
                                type="number"
                                min="0"
                                max="10000"
                                value={deposit}
                                onChange={e => setDeposit(e.target.value)}
                                required
                            />
                        </label>
                        <button
                            className="add-cash-buttons"
                            type="submit"
                        >
                            Submit
                        </button>
                        <button
                            className="add-cash-buttons"
                            onClick={e => setAddCash(false)}
                        >
                            Cancel
                        </button>

                    </form>
                }
            </div>
        </div>
    )
}

export default AddCash
