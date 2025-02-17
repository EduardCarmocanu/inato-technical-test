import { CountryEnum } from "../enums/country.enum"

export class TrialModel {
  name: string
  country: CountryEnum
  start_date: Date
  end_date: Date
  sponsor: string
  canceled: boolean
}