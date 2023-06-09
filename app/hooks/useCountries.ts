import countries from "world-countries";

const formatedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCounties = () => {
  const getAll = () => formatedCountries;

  const getByValue = (value: string) =>
    formatedCountries.find((country) => country.value === value);

  return {
    getAll,
    getByValue,
  };
};

export default useCounties;
