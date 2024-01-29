import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();

  const uniqueCountries = cities.reduce(function (arr, city) {
    if (!arr.map((currCity) => currCity.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return arr;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {uniqueCountries.map((country) => (
        <CountryItem country={country} key={country.id} isLoading={isLoading} />
      ))}
    </ul>
  );
}

export default CountryList;
