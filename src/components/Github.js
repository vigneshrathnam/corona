import React,{ useState } from 'react';

function Github() {
    const [visible,setVisible]=useState(true);
    return (
        <div className={visible?"":"d-none"} >
            <div className="fixed-bottom rounded-top text-center p-3 container d-block"
            style={{backgroundColor: "#f0eeed"}}>
            <div className="container">Contribute to my Github project</div>
            <div className="mx-0 text-center">
                <div className="mt-4">
                    <a target="_blank" rel="noopener noreferrer" 
                    className="btn btn-success btn-sm d-inline-block px-3"
                    href="https://github.com/vigneshrathnam/corona">
                        Ok
                    </a>
                    <button  className="btn btn-danger btn-sm ml-3 px-2 d-inline-block" onClick={(e)=>{
                        e.preventDefault();
                        setVisible(false);
                    }}>
                        Cancel
                    </button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Github
