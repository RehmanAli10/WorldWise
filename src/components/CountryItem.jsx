import styles from "./CountryItem.module.css";
import Spinner from "./Spinner";

function CountryItem({ country, isLoading }) {
  if (isLoading) return <Spinner />;
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
