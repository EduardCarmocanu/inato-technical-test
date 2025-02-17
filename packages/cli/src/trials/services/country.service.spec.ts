import { describe, expect, it, jest } from '@jest/globals';
import { countryService } from './country.service';

jest.mock('../../countries.json', () => ([
    {
        "name": "France",
        "code": "FR"
    },
    {
        "name": "Spain",
        "code": "ES"
    },
]))

describe('countryService', () => {
    const service = countryService()

    describe('getCountryCodeOptions', () => {
        it('should return a list country code options from countries.json', () => {
            expect(service.getCountryCodeOptions()).toEqual(['FR', 'ES'])
        })
    })

    describe('getCountryName', () => {
        it('should return country name based on country code', () => {
            expect(service.getCountryName('FR')).toEqual('France')
            expect(service.getCountryName('ES')).toEqual('Spain')
        })

        it('should throw an error if given country code does not exists', () => {
            try {
                expect(service.getCountryName('LA')).toThrowError(Error);
            } catch (e: any) {
                expect(e.message).toEqual('Country code LA does not exists')
            }
        })
    })
})