import { useEffect, createContext, useContext, useReducer } from "react";

const BASE_URL = "http://localhost:7000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };
    case "cities/detail":
      return { ...state, currentCity: action.payload, isLoading: false };
    case "cities/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        currentCity: action.payload,
      };

    case "cities/deleted":
      const deletingCities = state.cities.filter(
        (currCity) => currCity.id !== action.payload
      );
      return { ...state, cities: deletingCities, isLoading: false };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        currentCity: {},
      };

    default:
      throw new Error("something went wrong with actions");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);

        dispatch({ type: "rejected", payload: "something went wrong!" });

        const data = await res.json();

        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data",
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;

    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);

      dispatch({ type: "rejected", payload: "something went wrong!" });

      const data = await res.json();

      dispatch({ type: "cities/detail", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error getting city",
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });

      dispatch({ type: "rejected", payload: "something went wrong!" });

      dispatch({ type: "cities/created", payload: newCity });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating city",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "rejected", payload: "something went wrong!" });

      dispatch({ type: "cities/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting city",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities context was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
