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

  // watchCryptoArr.forEach(element => {
  //   cryptoInWatchObj[element.crypto_id] = [(cryptoInWatchObj[element.crypto_id]), element.watchlist_id]
  // })
  // watchCryptoArr.forEach(element => {
  //   if (cryptoInWatchObj[element.crypto_id] === null) {
  //     cryptoInWatchObj[element.crypto_id] = element.watchlist_id
  //   }
  //   else {
  //     cryptoInWatchObj[element.crypto_id] = [(cryptoInWatchObj[element.crypto_id]), element.watchlist_id]
  //   }
  // })


  watchCryptoArr.forEach(element => {
    if (cryptoInWatchObj[element.crypto_id]) {
      let arr = cryptoInWatchObj[element.crypto_id];
      arr.push(element.watchlist_id)
      cryptoInWatchObj[element.crypto_id] = arr;
    } else {
      cryptoInWatchObj[element.crypto_id] = [element.watchlist_id]
    }
  })


  const thisCryptoInWatchList = cryptoInWatchObj[thisCrypto?.id]
  console.log(thisCryptoInWatchList)

  useEffect(() => {
    dispatch(getWatchlistThunk(sessionUser.id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getWatchCryptoThunk(sessionUser.id))
  }, [dispatch])



  return (
    <>
      <div className='add-to-list-button-container'>
        <button
          className='add-to-list-button'
          onClick={() => setShowModal(true)}>
          Add To List</button>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h4 className='add-watchlist-title'>Add {thisCrypto.name} to one of your watchlists</h4>
          {
            watchlistArr?.map(([watchlist_id, listName]) => (
              !(thisCryptoInWatchList.includes(+watchlist_id)) && (
                <div className='individual-list-container'>
                  <button className='individual-list-name'
                    onClick={e => dispatch(addWatchCryptoThunk({ crypto_id: thisCrypto?.id, watchlist_id }))}>
                    {listName}
                  </button>
                </div>)
            ))
          }
        </Modal>
      )}
    </>
  );
}

export default AddCryptoToList;
