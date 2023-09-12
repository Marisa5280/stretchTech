// // import React from 'react';
// import "./App.css";
// import { useEffect, useState } from "react";
// import ErrorComponent from "../ErrorComponent/ErrorComponent";
// import LoadingComponent from "../LoadingComponent/LoadingComponent";
// import ParksWrapper from "../ParksWrapper/ParksWrapper";

// function App() {
//   const [parks, setParks] = useState([]);
//   const [individualPark, setIndividualPark] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [newError, setError] = useState("");

//   function getParksData() {
//     fetch(
//       "https://developer.nps.gov/api/v1/parks?limit=500&api_key=88uiVoPed9zuR3daHPnsrPxaYV0ZWsiqP66VvpSc"
//     )
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(response.status.toString());
//         }
//         return response.json();
//       })
//       .then((data) => {
//         if (data && data.data) {
//           setParks(data);
//           setError("");
//           // console.log('data:', data);
//           // console.log('updated parks state', parks)
//           setIsLoading(false);
//         }
        
        
//       })
//       // .then((parks) => {
//       //   if (parks.length > 0){
//       //     console.log('parks:', parks)
//       //   }
        
//       // })
//       .catch((response) => {
//         setError(response || "failed to fetch parks!");
//       });
//   }

//   useEffect(() => {
//     getParksData();
//   }, []);

//   useEffect(() => {
//     console.log('parks', parks)
//   }, [parks])

//   return (
//     <div className="App">
//       { isLoading ? ( 
//       <LoadingComponent /> 
//       ) : 
//       // newError ? (
//       //   <ErrorComponent />
//       // ) :
//        (
//         <h1>placeholder for homepage component -- aka Parks Wrapper</h1>
//       )


//       }
      
//     </div>
//   );
// }

// export default App;


import React, { useEffect, useState } from "react";
import "./App.css";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import ParksWrapper from "../ParksWrapper/ParksWrapper";
import ParkDetails from '../ParkDetails/ParkDetails';
import Favorites from '../Favorites/Favorites';
import Header from "../Header/Header"
import { getParksData, getIndividualPark } from '../../ApiCalls';
import { Routes, Route } from 'react-router-dom';


function App() {
  const [parks, setParks] = useState([]);
  const [individualPark, setIndividualPark] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newError, setError] = useState("");

  useEffect(() => {
    // Fetching all parks
    getParksData()
      .then((data) => {
        if (data && data.data) {
          setParks(data.data);
          console.log("All parks data:", data.data);
          setError("");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setError(error.message || "Failed to fetch parks!");
        setIsLoading(false);
      });
  
    // Fetching individual park by parkCode, for example 'acad'
    getIndividualPark('acad')
      .then((data) => {
        if (data && data.data && data.data.length > 0) {
          setIndividualPark(data.data[0]);
          console.log("Individual park data:", data.data[0]);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch individual park:", error);
      });
  
  }, []);
  
  useEffect(() => {
    console.log('Parks fetched:', parks);
    console.log('Individual park:', individualPark);
  }, [parks, individualPark]);

  return (

<main className="App">
         <Header /> 
      {newError ? ( 
         <ErrorComponent error={{ message: newError }} />
       ) :  isLoading ? ( 
        <LoadingComponent /> 
        ) : (
      <Routes>
        <Route path="/" element={<ParksWrapper parks={parks} />} />
        <Route path="/:id" element={<ParkDetails park={individualPark} />} />
        {/* <Route path="/favorites" element={<Favorites parks={parks} />} /> */}
        <Route path="/error" element={<ErrorComponent error={{ message: newError }} />} />
      </Routes>
      )}
    </main>
  );
  
}

export default App;
