import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";

function CountryList({ cities, isLoader }) {
  const uniqueCountries = cities.reduce(function (arr, city) {
    if (!arr.map((currCity) => currCity.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return arr;
    }
  }, []);

  console.log(uniqueCountries);

  return (
    <ul className={styles.countryList}>
      {uniqueCountries.map((country) => (
        <CountryItem country={country} key={country.id} isLoader={isLoader} />
      ))}
    </ul>
  );
}

export default CountryList;
