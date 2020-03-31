import React, { useState} from 'react'

function Search({search}) {
    const [country,setCountry]=useState('');
    var handleClick=e=>{
        e.preventDefault();
        search(country);
    }
    return (
        <div>
            <div className="bg-light p-1 h4 mt-2 text-center">Search your country </div>
                <div className="container">  
                    <div className="d-table mx-auto">
                        <div className="input-group my-4">
                        <input type="text"
                        value={country}
                        onChange={e=>{
                            setCountry(e.target.value);
                        }} 
                        className="form-input-control pl-2 py-1" placeholder="Search"/>
                        <div className="input-group-append">
                            <button onClick={handleClick} className="btn btn-primary" type="submit">
                                <i className="fa fa-search fa-lg"></i>
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Search
