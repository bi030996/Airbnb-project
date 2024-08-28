import countries from "world-countries";

const formattedCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latln: country.latlng,
    region: country.region
}));

const useCountries = () => {
    const getAll = () => formattedCountries;

    const getByValue = (value: string) => { //search in the formattedCountries map, get the value of item matches the value we will pass in the future
        return formattedCountries.find((item) => item.value === value);
    }

    return{
        getAll,
        getByValue
    }
};

export default useCountries