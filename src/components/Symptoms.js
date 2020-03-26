import React, { useEffect, useRef } from 'react'

function Symptoms({sym}) {
const ref=useRef(null);

useEffect(()=>{
    const table=`
        <thead>
        <th> Symptoms
        </th>
        <th> %
        </th>
        </thead>
        `;
    ref.current.innerHTML=table+sym.props.children;
    return;
},[sym]);

    return (
        <div>
            <div className="bg-light p-1 h4 mt-4 text-center">Symptoms</div>
            <div className="container">
                <table ref={ref} className="table table-bordered table-hover">
                </table>
            </div>
        </div>
    );
}

export default Symptoms;
