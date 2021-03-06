import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Plot from 'react-plotly.js';

import { getAllDataThunk } from '../../store/cryptoData';

const CrytpoGraph = ({ cryptoProp }) => {

    const dispatch = useDispatch()


    const cryptoData = useSelector(state => state.data)?.prices

    const [cryptoDatePrice, setCryptoDatePrice] = useState([])
    const [timeFrame, setTimeFrame] = useState(2678400)



    useEffect(() => {
        dispatch(getAllDataThunk(cryptoProp, timeFrame))
    }, [dispatch, cryptoProp, timeFrame])


    useEffect(() => {
        let newArr = []
        cryptoData?.forEach(element => {
            let dateObj = (new Date(element[0]))
            newArr.push([dateObj, element[1]])
        });
        setCryptoDatePrice(newArr)
    }, [dispatch, cryptoData, timeFrame])



    let xArray = []
    let yArray = []

    cryptoDatePrice?.forEach(element => {
        xArray.push(element[0])
        yArray.push(element[1])
    })



    return (
        <div>
            <div className="graph-container">
                <Plot
                    data={[
                        {
                            x: xArray,
                            y: yArray,
                            type: 'scatter',
                            mode: 'lines',
                            marker: { color: 'orangered' },
                        },

                    ]}
                    layout={{
                        showlegend: false,
                        margin: {
                            b: 0,
                            r: 30,
                            l: 40,
                            t: 0,
                        },
                        autosize: true,
                        modebar: {
                            remove: ["autoScale2d", "autoscale", "editInChartStudio", "editinchartstudio", "hoverCompareCartesian", "hovercompare", "lasso", "lasso2d", "orbitRotation", "orbitrotation", "pan", "pan2d", "pan3d", "reset", "resetCameraDefault3d", "resetCameraLastSave3d", "resetGeo", "resetSankeyGroup", "resetScale2d", "resetViewMapbox", "resetViews", "resetcameradefault", "resetcameralastsave", "resetsankeygroup", "resetscale", "resetview", "resetviews", "select", "select2d", "sendDataToCloud", "senddatatocloud", "tableRotation", "tablerotation", "toImage", "toggleHover", "toggleSpikelines", "togglehover", "togglespikelines", "toimage", "zoom", "zoom2d", "zoom3d", "zoomIn2d", "zoomInGeo", "zoomInMapbox", "zoomOut2d", "zoomOutGeo", "zoomOutMapbox", "zoomin", "zoomout"]
                        },
                        grid: {
                            columns: 1,
                            rows: 1
                        },
                        xaxis: {

                            showgrid: false
                        },
                        yaxis: {
                            showgrid: false
                        }
                    }}
                    useResizeHandler={true}
                    style={{ width: "100%", height: "100%" }}

                />
            </div>
            <div>
                <button className='toggle-time-buttons' onClick={e => setTimeFrame(2678400 / 4)}>View weekly</button>
                <button className='toggle-time-buttons' onClick={e => setTimeFrame(2678400)}>View monthly</button>
                <button className='toggle-time-buttons' onClick={e => setTimeFrame(2678400 * 12)}>View yearly</button>
            </div>
        </div>
    )
}

export default CrytpoGraph
