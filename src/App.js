  import React, { useState,useEffect } from 'react';
  import "./css/bootstrap.min.css";
  import Map from "./components/Map";
  import List from './components/List';
  import { HashLoader } from "react-spinners";
  import Foot from './components/Foot';
  import Github from './components/Github';
  import 'font-awesome/css/font-awesome.min.css';
  import nothingSRC from './nothing.png'
  import axios from "axios";
 
  function App() {
    const [fetched,setfetched]=useState(false);
    const [country,setCountry]=useState(0);
    const [totalCases,setTotalCases]=useState(0);
    const [recovered,setRecovered]=useState(0);
    const [deaths,setDeaths]=useState(0);
    const [data,setData]=useState('');
    const loading=  ( <div 
                      style={{display: "flex", justifyContent: "center", alignItems: "center", height: "80vh"}}>
                        <HashLoader
                        size={75}
                        acolor={"#123abc"}
                        loading={true}
                        />
                    </div>
  );
  const [content,setContent]=useState("");
  const [list,setList]=useState("");
  useEffect(()=>{
    if(fetched === false) {
      getData();
    }
    else {
      putData();
    }
    return;
    // eslint-disable-next-line
  },[fetched])
  var getData=async ()=>{
    try{
    let [val]=await Promise.all([axios.get("https://corsanywhere.herokuapp.com/en.wikipedia.org/wiki/2019%E2%80%9320_coronavirus_pandemic")])
    setData(val.data);  
    setfetched(true);
    }
    catch(e)
    {
      console.log(e);
    }
  }
  var putData=()=>{
    var table=``;
    const xmlP=new DOMParser();
    const response=xmlP.parseFromString(data,"text/html");
    setCountry(+response.querySelector("tbody tr th.covid-total-row:nth-child(1) b").innerText);
    setTotalCases(response.querySelector("tbody tr th.covid-total-row:nth-child(2) b").innerText)
    setDeaths(response.querySelector("tbody tr th.covid-total-row:nth-child(3) b").innerText);
    setRecovered(response.querySelector("tbody tr th.covid-total-row:nth-child(4) b").innerText);
    const html=`
    <div>
    <img style="width: 60%;height: auto;" src="https://upload.wikimedia.org/wikipedia/commons/3/3b/COVID-19_Outbreak_World_Map_per_Capita.svg" alt="world">
    <div class="container p-1 h4 mt-2 text-center">${response.querySelector("table tbody tr td div div.center").innerText}
    </div>
    <div class="container ">
    ${response.querySelector("table tbody tr td div .legend").parentNode.innerHTML}
    </div>
    </div>
    `;
    setContent(html);
    const updatedCountry=+response.querySelector("tbody tr th.covid-total-row:nth-child(1) b").innerText+3;
    for(let i=3;i<updatedCountry;i++){
      const activeCasesCurrent=Intl.NumberFormat("en-IN").format(+response.querySelectorAll("div#covid19-container tbody tr:nth-child("+i+") td")[0].textContent.replace(/(,)/g,"")-+response.querySelectorAll("div#covid19-container tbody tr:nth-child("+i+") td")[1].innerText.replace(/(,)/,"")-+response.querySelectorAll("div#covid19-container tbody tr:nth-child("+i+") td")[2].textContent.replace(/(,)/,"").replace("–",0));
      table+=`<tr>
        <th><img width="23" height="12" src="${response.querySelector("div#covid19-container tbody tr:nth-child("+i+") th img").src}" alt="flag" /> &nbsp;</th> 
        <th>${response.querySelectorAll("div#covid19-container tbody tr:nth-child("+i+") th ")[1].innerText.replace(/((\(.*\))?\[.*\])/,'')}</th>
        <td>${response.querySelectorAll("div#covid19-container tbody tr:nth-child("+i+") td")[0].innerText}</td>
        <td>${response.querySelectorAll("div#covid19-container tbody tr:nth-child("+i+") td")[1].innerText}</td>
        <td>${response.querySelectorAll("div#covid19-container tbody tr:nth-child("+i+") td")[2].textContent}</td>
        <td>${activeCasesCurrent}</td>
      </tr>`;
    }
    setList(table)
  }
    var filterTable=(filter)=>{
      var  table, tr, th, txtValue,count=0;
      var nothing=document.getElementById("nothing");
      table = document.getElementById("myTable");
      filter=filter.toUpperCase();
      tr = table.tBodies[0].rows;
      for (let i = 0; i < tr.length; i++) {
        th = tr[i].getElementsByTagName("th")[1];
        if (th) {
          txtValue = th.textContent || th.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].classList.remove("d-none");
          } else {
            tr[i].classList.add("d-none");
          }
        }       
        if(tr[i].classList.contains("d-none")) count++;
      }
      if(count === +country ) {
        nothing.innerHTML=`
                          <div class="container">
                          <div class="text-center">
                          <img src=${nothingSRC} class="img-responsive"  alt="nothing"/>
                          </div>
                          <div class="h4 text-center mt-2">Oops!
                          </div>
                          <div class="text-dark text-center container mt-1">
                          No Country found.
                          </div>
                          </div>`;
        table.tHead.classList.add("d-none");
      } else{
        nothing.innerHTML="";
        table.tHead.classList.remove("d-none");
      }
    }

    return(
      <div className="container">
        <h1 className="bg-primary text-white p-2 h2 text-center">Corona Virus Live Statistics</h1>
        {fetched?<div>
        <Map content={<>{content}</>} country={country}
        recovered={recovered} totalcases={totalCases}
        deaths={deaths}
        />
          <List list={list} filterTable={filterTable}/>
          <Foot />  
          <Github />
        </div>:loading}
          <div className="container">
          </div>
      </div>
    );
  }

  export default App;
