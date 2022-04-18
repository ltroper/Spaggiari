import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Modal } from '../../context/Modal.js'
import { getWatchlistThunk, editWatchlistThunk } from '../../store/watchlist'

function EditWatchlistName({ name, id }) {

    const history = useHistory()

    const dispatch = useDispatch()

    const [showModal, setShowModal] = useState(false);
    const [watchlistName, setWatchlistName] = useState(name)


    const sessionUser = useSelector(state => state.session.user);



    useEffect(() => {
        dispatch(getWatchlistThunk(sessionUser.id));
    }, [dispatch]);


    const handleSubmit = e => {
        e.preventDefault()
        const watchlist = {
            id,
            name: watchlistName,
            user_id: sessionUser.id
        }
        dispatch(editWatchlistThunk(watchlist))
    }

    return (
        <>
            <div >
                <button
                    className='edit-delete-buttons'
                    onClick={() => setShowModal(true)}>
                    Edit</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <form onSubmit={handleSubmit} className="edit-name-form">
                        <input
                            className='buy-crypto-input-menu edit-name-input'
                            type='text'
                            value={watchlistName}
                            onChange={e => setWatchlistName(e.target.value)}
                        />
                        <button
                            className='edit-name-button'
                            type='submit'
                        >Submit</button>
                    </form>
                    <button
                        className='edit-name-button'
                        onClick={() => setShowModal(false)}
                    >Cancel</button>
                </Modal>
            )}
        </>
    );
}

export default EditWatchlistName;
