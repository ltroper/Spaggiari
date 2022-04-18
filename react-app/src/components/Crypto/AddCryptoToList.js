import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal.js'
import { getWatchlistThunk } from '../../store/watchlist'
import { addWatchCryptoThunk, getWatchCryptoThunk } from '../../store/watchCrypto'


function AddCryptoToList({ thisCrypto }) {

  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false);

  const sessionUser = useSelector(state => state.session.user);
  const userWatchlists = useSelector(state => state.watchlist)
  const watchlistArr = Object.entries(userWatchlists)

  const watchCrypto = useSelector(state => state?.watchCrypto)
  const watchCryptoArr = Object.values(watchCrypto)

  let cryptoInWatchObj = {}

  watchCryptoArr.forEach(element => {
    console.log(element.crypto_id, element.watchlist_id)
    if (cryptoInWatchObj[element.crypto_id] === null) {
      cryptoInWatchObj[element.crypto_id] = element.watchlist_id
    }
    else {
      cryptoInWatchObj[element.crypto_id] = [(cryptoInWatchObj[element.crypto_id]), element.watchlist_id]
    }
  })

  console.log(watchCryptoArr)
  console.log(cryptoInWatchObj)


  useEffect(() => {
    dispatch(getWatchlistThunk(sessionUser.id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getWatchCryptoThunk(sessionUser.id))
  }, [dispatch])



  return (
    <>
      <button
        onClick={() => setShowModal(true)}>
        Add To List</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {
            watchlistArr?.map(([watchlist_id, listName]) => (

              <button onClick={e => dispatch(addWatchCryptoThunk({ crypto_id: thisCrypto?.id, watchlist_id }))}>
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
