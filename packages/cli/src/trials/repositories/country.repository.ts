import { CountryModel } from "../models/country.model";

export const countryRepository = () => {
    const countriesList: CountryModel[] = require('../../../countries.json')

    const getCountriesList = (): CountryModel[] => {
        return countriesList
    }

    return {
        getCountriesList
    }
}