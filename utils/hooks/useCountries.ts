import countries from 'world-countries'

const formattedCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region,
}))

const useCountries = () =>{
    const getAll = () => formattedCountries;
    const findByValue = (value : string) => {
        return formattedCountries.find((item) => item.value === value);
    }


    return {getAll, findByValue}
}

export default useCountries;