import React, { useRef, useEffect } from "react";

function List({list}) {
    const ref=useRef(null);
    useEffect(()=>{
        const thead=` <thead>
        <tr>
        <th>Location 
        </th>
        <th>Total Cases
        </th>
        <th>Deaths
        </th>
        <th>Total Recovered
        </th> 
        <th>Active Cases
        </th>
        </tr>
        </thead>`;
        const table=thead+list.props.children;
        ref.current.innerHTML=table;
        return;
    },[list]);

    return (
    <div>
        <div className="bg-light p-1 h4 mt-2 text-center">List of countries </div>
        <div className="tab container">
            <table ref={ref} className="table table-bordered table-hover">
            
            </table>
        </div>
    </div>
    )
}

export default List
