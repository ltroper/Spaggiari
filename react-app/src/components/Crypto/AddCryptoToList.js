import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal.js'
import { getWatchlistThunk } from '../../store/watchlist'
import { addWatchCryptoThunk } from '../../store/watchCrypto'


function AddCryptoToList({thisCrypto}) {

    const dispatch = useDispatch()

    const [showModal, setShowModal] = useState(false);
    const [key, setKey] = useState("")

    const sessionUser = useSelector(state => state.session.user);
    const userWatchlists = useSelector(state => state.watchlist)
    const watchlistArr = Object.entries(userWatchlists)



    useEffect(() => {
        dispatch(getWatchlistThunk(sessionUser.id));
    }, [dispatch]);



    return (
      <>
        <button
        onClick={() => setShowModal(true)}>
        Add To List</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
              {
                  watchlistArr?.map(([watchlist_id, listName]) => (
                      <button onClick={e => dispatch(addWatchCryptoThunk({crypto_id: thisCrypto?.id, watchlist_id}))}>
                          {listName}
                      </button>
                  ))
              }
          </Modal>
        )}
      </>
    );
  }

  export default AddCryptoToList;
