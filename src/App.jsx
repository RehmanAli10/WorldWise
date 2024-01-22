import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import HomePage from "./pages/Homepage";
import Pricing from "./pages/Pricing.jsx";
import Product from "./pages/Product.jsx";
import Login from "./pages/Login.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import CityList from "./components/CityList.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import CountryList from "./components/CountryList.jsx";

const BASE_URL = "http://localhost:8000";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(function () {
    async function fetchingCities() {
      try {
        setIsLoading(true);
        const resp = await fetch(`${BASE_URL}/cities`);
        console.log(resp);

        if (!resp.ok) throw new Error("Seomething Went Wrong 😱");

        const data = await resp.json();
        setCities(data);
      } catch (err) {
        console.err(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchingCities();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="product" element={<Product />} />
          <Route path="login" element={<Login />} />

          <Route path="app" element={<AppLayout />}>
            {/* <Route
              index
              element={<CityList cities={cities} isLoading={isLoading} />}
            /> */}
            <Route index element={<Navigate replace to="cities" />} />
            <Route
              path="cities"
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route
              path="countries"
              element={<CountryList cities={cities} isLoading={isLoading} />}
            />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
