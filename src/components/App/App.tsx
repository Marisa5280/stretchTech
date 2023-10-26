import { useEffect, useState } from "react";
import "./App.css";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import Error404 from "../ErrorComponent/Error404";
import Error500 from "../ErrorComponent/Error500";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { ParkProps } from "../ParkCards/ParkCards";
import ParksWrapper from "../ParksWrapper/ParksWrapper";
import ParkDetails from "../ParkDetails/ParkDetails";
import Favorites from "../Favorites/Favorites";
import Header from "../Header/Header";
import { getParksData } from "../../ApiCalls";
import { Routes, Route, Navigate } from "react-router-dom";

interface Image {
  url: string;
  altText: string;
}

interface Park {
  id: string;
  name: string;
  parkCode: string;
  fullName: string;
  designation: string;
  images: Image[];
}

interface AppState {
  parks: Park[];
  isLoading: boolean;
  newError: string;
  favorites: Park[];
}

function App() {
  const [parks, setParks] = useState<AppState["parks"]>([]);
  const [isLoading, setIsLoading] = useState<AppState["isLoading"]>(true);
  const [newError, setError] = useState<AppState["newError"]>("");
  const [favorites, setFavorites] = useState<ParkProps[]>([]);

  useEffect(() => {
    getParksData()
      .then((data: any) => {
        if (data && data.data) {
          setParks(data.data as Park[]);
          setError("");
          setIsLoading(false);
        }
      })
      .catch((response: any) => {
        setError(`${response}` || "Failed to fetch parks!");
        setIsLoading(false);
      });
  }, []);

  const renderError = () => {
    if (newError) {
      return <ErrorComponent error={{ message: newError }} />;
    }
  };

  return (
    <main className="App">
      <Header />
      {newError ? (
        renderError()
      ) : isLoading ? (
        <LoadingComponent />
      ) : (
        <Routes>
          <Route
            path="/stretchTech/"
            element={
              <ParksWrapper
                parks={parks}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            }
          />
          <Route
            path="/park/:parkCode"
            element={<ParkDetails setIsLoading={setIsLoading} />}
          />
          <Route
            path="/favorites"
            element={
              <Favorites favorites={favorites} setFavorites={setFavorites} />
            }
          />
          <Route path="/*" element={<Navigate to="/404" />} />
          <Route path="/404" element={<Error404 />} />
          <Route path="/500" element={<Error500 />} />
          <Route path="/test-500" element={<Error500 />} />
          <Route
            path="/error"
            element={<ErrorComponent error={{ message: newError }} />}
          />
        </Routes>
      )}
    </main>
  );
}

export default App;
