import React, { useEffect } from 'react'
import { useRef } from 'react';

function Map({content,country,deaths,recovered,totalcases}) {
    const ref = useRef(null);
    useEffect(()=>{
        ref.current.innerHTML=content.props.children;
        return;
    },[content]);
    return (
        <div>
        <div className="bg-light p-1 h4 mt-2 text-center">Confirmed cases of coronavirus disease (COVID-19)</div>
        <div ref={ref} className="text-center"></div>
        <div className="bg-light p-1 h4 mt-2 text-center">Current Status</div>
        <div className="container text-center mt-3">
            <div className="text-bold h4 pt-3">Total countries Affected</div>
            <div className="text-info h5">{country} Countries</div>
            <div className="text-bold h4 pt-3">Total Cases</div>
            <div className="text-warning h5">{totalcases} Cases</div>
            <div className="text-bold h4 pt-3">Total Recovered</div>
            <div className="text-success h5">{recovered} Recovered</div>
            <div className="text-bold h4 pt-3">Total countries Affected</div>
            <div className="text-danger h5">{deaths} Deaths</div>
        </div>
    </div>
    )
}

export default Map;
