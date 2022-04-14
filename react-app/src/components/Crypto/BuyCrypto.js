import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const BuyCrypto = ({ thisCrypto }) => {


    const [buying, setBuying] = useState(true)

    return (
        <div>
            <button onClick={e => setBuying(true)}>Buy {thisCrypto.name}</button>
            <button onClick={e => setBuying(false)}>Sell {thisCrypto.name}</button>
            {buying &&
            <div>Buying</div>
            }
            {!buying &&
            <div>Selling</div>
            }
        </div>
    )
}

export default BuyCrypto
