import { describe, expect, it, jest } from '@jest/globals';
import { countryRepository } from './country.repository';
import { CountryModel } from '../models/country.model';

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

jest.doMock('../../countries.json', () => testCountries)


describe('countryRepository', () => { 
    const repository = countryRepository();

    describe('getCountriesList', () => {
        it('should return a list of countries', () => {
            expect(repository.getCountriesList()).toEqual([
                {
                    "name": "France",
                    "code": "FR"
                },
                {
                    "name": "Spain",
                    "code": "ES"
                },
            ]);
        })
    })
})