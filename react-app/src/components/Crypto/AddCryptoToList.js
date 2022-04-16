import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from '../../context/Modal.js'
import { getWatchlistThunk } from '../../store/watchlist'



function AddCryptoToList() {

    const dispatch = useDispatch()

    const [showModal, setShowModal] = useState(false);

    const sessionUser = useSelector(state => state.session.user);
    const userWatchlists = useSelector(state => state.watchlist)
    const watchlistArr = Object.values(userWatchlists)

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
                  watchlistArr?.map(list => (
                      <div>
                          {list}
                      </div>
                  ))
              }
          </Modal>
        )}
      </>
    );
  }

  export default AddCryptoToList;
