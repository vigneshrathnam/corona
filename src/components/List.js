import React, { useEffect, useState } from "react";
import Search from "./Search";

function List({list,filterTable}) {
    const [rev,setRev]=useState(true);
    function sortTable(table, col, reverse) {
        var tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
            tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
            i;
        reverse = -((+reverse) || -1);
        tr = tr.sort(function (a, b) { // sort rows
            return reverse // `-1 *` if want opposite order
                * (a.cells[col].textContent.trim() // using `.textContent.trim()` for test
                    .localeCompare(b.cells[col].textContent.trim())
                   );
        });
        for(i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order
    }

    function sortTableByNum(table, col, reverse) {
        var tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
            tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
            i;
        reverse = -((+reverse) || -1);
        tr = tr.sort(function (a, b) { // sort rows
            return reverse // `-1 *` if want opposite order
                * (+a.cells[col].textContent.trim().replace(',','')-+b.cells[col].textContent.trim().replace("-",0).replace(',',''));
        });
        for(i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order
    }
    
    useEffect(()=>{
        var table=document.getElementById("myTable");
        table.querySelectorAll("thead th")[0].addEventListener('click',(e)=>{
            e.stopPropagation();
            sortTable(table,1,rev);
            setRev(!rev);
        });
        for(let i=1;i<5;i++){
            table.querySelectorAll("thead th")[i].addEventListener('click',(e)=>{
                e.stopPropagation();
                sortTableByNum(table,i+1,rev);
                setRev(!rev);
            });
        }
        return;
    },[list,rev]);

    const thead=`<thead>
    <tr>
    <th colspan='2'>Location &nbsp; <i class="fa fa-sort fa-lg text-dark"></i>
    </th>
    <th>Total Cases &nbsp; <i class="fa fa-sort fa-lg text-dark"></i>
    </th>
    <th>Deaths &nbsp; <i class="fa fa-sort fa-lg text-dark"></i>
    </th>
    <th>Total Recovered &nbsp; <i class="fa fa-sort fa-lg text-dark"></i>
    </th> 
    <th>Active Cases &nbsp; <i class="fa fa-sort fa-lg text-dark"></i>
    </th>
    </tr>
    </thead>`;
    return (
    <div>
        <div className="bg-light p-1 h4 mt-2 text-center">List of countries </div>
        <Search search={filterTable} />
        <div id="nothing"></div>
        <div className="tab covid19 container">
            <table dangerouslySetInnerHTML={{ __html: thead+list }} id="myTable"  className="table table-bordered table-hover">
            
            </table>
        </div>
    </div>
    )
}

export default List
