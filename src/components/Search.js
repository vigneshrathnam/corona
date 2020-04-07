import React, { useState} from 'react'

function Search({search}) {
    const [country,setCountry]=useState('');
    var handleClick=e=>{
        e.preventDefault();
        setCountry('');
        search('');
    }
    return (
        <div>
                <div className="container">  
                    <div className="d-table mx-auto">
                        <div className="input-group my-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fa fa-search"></i>
                            </span>
                        </div>
                        <input type="text"
                        value={country}
                        onChange={e=>{
                            setCountry(e.target.value);
                            search(e.target.value);
                        }} 
                        className="form-control pr-ad py-1" placeholder="Search"/>
                        {(country.length>0)?<span className="input-group-btn">
                            <button onClick={handleClick} className="btn btn-default" type="submit">
                                <i className="fa fa-times fa-lg text-dark"></i>
                            </button>
                        </span>:''}
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Search
