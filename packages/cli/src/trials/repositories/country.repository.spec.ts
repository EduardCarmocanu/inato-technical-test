import { describe, expect, it, jest } from '@jest/globals';
import { CountryModel } from '../models/country.model';
import { countryRepository } from './country.repository';

const testCountries: CountryModel[] = [
    {
        "name": "France",
        "code": "FR"
    },
    {
        "name": "Spain",
        "code": "ES"
    },
]

jest.mock('../../countries.json', () => testCountries)

describe('countryRepository', () => { 
    const repository = countryRepository();

    describe('getCountriesList', () => {
        it('should return a list of countries', () => {
            expect(repository.getCountriesList()).toEqual(testCountries);
        })
    })
})