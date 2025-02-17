import { CountryModel } from "../models/country.model";

const countriesList: CountryModel[] = require('../../countries.json')

export const countryRepository = () => {
    const getCountriesList = (): CountryModel[] => {
        return countriesList
    }

    return {
        getCountriesList
    }
}