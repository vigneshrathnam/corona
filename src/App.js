import React, {  useState} from 'react';
import "./css/bootstrap.min.css";
// import Add from "./components/Add";
import Map from "./components/Map";
import List from './components/List';
import HashLoader from "react-spinners/HashLoader";
import Foot from './components/Foot';

function App() {
  var table=``;

  const [loaded,setloaded]=useState(false);
  const [country,setCountry]=useState(0);
  const [totalCases,setTotalCases]=useState(0);
  const [recovered,setRecovered]=useState(0);
  const [deaths,setDeaths]=useState(0);
  const loading=  ( <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "80vh"}}><HashLoader
  size={75}
  acolor={"#123abc"}
  loading={true}
/>
</div>
);

  const [content,setContent]=useState("Failed to Load");
  const [list,setList]=useState("Loading");
  fetch("https://corsanywhere.herokuapp.com/en.wikipedia.org/wiki/2019%E2%80%9320_coronavirus_pandemic")
  .then(res=>res.text())
  .then(data=>{return {data:data,cod: 200}})
  .catch(e=>{return {data:e,cod: 400}})
  .then(data=>{
      if(data.cod===200) {
      const xmlP=new DOMParser();
      const response=xmlP.parseFromString(data.data,"text/html");
      setCountry(response.querySelector("tbody tr th.covid-total-row:nth-child(1) b").innerText);
      setTotalCases(response.querySelector("tbody tr th.covid-total-row:nth-child(2) b").innerText)
      setDeaths(response.querySelector("tbody tr th.covid-total-row:nth-child(3) b").innerText);
      setRecovered(response.querySelector("tbody tr th.covid-total-row:nth-child(4) b").innerText);
      setContent(response.querySelector("table.infobox tr:nth-child(1) td").innerHTML);
      for(let i=4;i<=country;i++){
        const activeCasesCurrent=Intl.NumberFormat("en-IN").format(response.querySelectorAll("div#covid19-container tbody tr:nth-child("+i+") td")[0].innerText.replace(/(,)/g,"")-response.querySelectorAll("div#covid19-container tbody tr:nth-child("+i+") td")[2].innerText.replace(/(,)/,"").replace("–",0));
        const activeCasesValid=activeCasesCurrent;
        table+=`<tr>
          <td>${response.querySelector("div#covid19-container tbody tr:nth-child("+i+") th:nth-child(1)").innerHTML}<td>
          ${response.querySelectorAll("div#covid19-container tbody tr:nth-child("+i+") th")[1].innerText.replace(/((\(.*\))?\[.*\])/,'')}
          <td>${response.querySelectorAll("div#covid19-container tbody tr:nth-child("+i+") td")[0].innerText}</td>
          <td>${response.querySelectorAll("div#covid19-container tbody tr:nth-child("+i+") td")[1].innerText}</td>
          <td>${response.querySelectorAll("div#covid19-container tbody tr:nth-child("+i+") td")[2].innerText}</td>
          <td>${activeCasesValid}</td>
        </tr>`;
      }
      setList(table)
      setloaded(true);
    }
    else {
      setContent("You must Need to have active internet connection.");
      setList("You must Need to have active internet connection.");
      setloaded(true);
    }
  })

  return(
    <div className="container">
      <div className="bg-primary text-white p-2 h2 text-center">Corona Virus App</div>
      {loaded?<div>
      <Map content={<>{content}</>} country={country}
       recovered={recovered} totalcases={totalCases}
       deaths={deaths}
       />
      {/* <Add /> */}
        <List list={<>{list}</>} />
        <Foot />  
      </div>:loading}
    </div>
  );
}

export default App;