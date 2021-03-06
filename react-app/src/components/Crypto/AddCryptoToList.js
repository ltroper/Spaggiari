import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Modal } from '../../context/Modal.js'
import { getWatchlistThunk, newWatchlistThunk } from '../../store/watchlist'
import { addWatchCryptoThunk, getWatchCryptoThunk } from '../../store/watchCrypto'

function AddCryptoToList({ thisCrypto }) {

  const history = useHistory()

  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false);
  const [newList, setNewList] = useState(false)
  const [watchlistName, setWatchlistName] = useState("")


  const sessionUser = useSelector(state => state.session.user);
  const userWatchlists = useSelector(state => state.watchlist)
  const watchlistArr = Object.entries(userWatchlists)

  const watchCrypto = useSelector(state => state?.watchCrypto)
  const watchCryptoArr = Object.values(watchCrypto)

  let cryptoInWatchObj = {}




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

  async function hanldeSubmit(e) {
    let watchlist = {
      user_id: sessionUser.id,
      name: watchlistName
    }

    await dispatch(newWatchlistThunk(watchlist))
    history.push("/")
  }

  useEffect(() => {
    dispatch(getWatchlistThunk(sessionUser.id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getWatchCryptoThunk(sessionUser.id))
  }, [dispatch, sessionUser.id])



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
              !(thisCryptoInWatchList?.includes(+watchlist_id)) && (
                <div className='individual-list-container'>
                  <button className='individual-list-name'
                    onClick={e => dispatch(addWatchCryptoThunk({ crypto_id: thisCrypto?.id, watchlist_id }))}>
                    {listName}
                  </button>
                </div>)
            ))
          }
          <h5 className='add-watchlist-title subtitle'>Don't see any lists?</h5>
          <h5 className='add-watchlist-title subsub'>This asset may be in all of your lists already</h5>
          <div className='add-list-from-modal-container'>
            <button
              className="buy-crypto-button add-watchlist-button"
              onClick={e => setNewList(true)}>
              Create a new one</button>
          </div>
          {newList &&
            <form onSubmit={hanldeSubmit}>
              <div className="add-new-list-container">
                <input
                  className="add-new-list-input"
                  type="text"
                  placeholder="List Name"
                  value={watchlistName}
                  onChange={e => setWatchlistName(e.target.value)}
                />
              </div>
              <div className="add-new-list-container">
                <button
                  className="add-new-list-submit"
                  type="submit"
                >Submit
                </button>
                <button
                  onClick={e => setNewList(false)}
                >Cancel
                </button>
              </div>
            </form>
          }
        </Modal>
      )}
    </>
  );
}

export default AddCryptoToList;
