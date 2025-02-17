import { Injectable } from "@nestjs/common";
import { CountryEnum } from "../enums/country.enum";
import { IMapper } from "../interfaces/mapper.interface";
import { IRawTrial } from "../interfaces/raw-trial.interface";
import { TrialModel } from "../models/trial.model";

@Injectable()
export class TrialMapper implements IMapper<IRawTrial, TrialModel> {
    map(rawObject: IRawTrial): TrialModel {
        const trial = new TrialModel();

        trial.name = rawObject.name;
        trial.canceled = rawObject.canceled;
        trial.sponsor = rawObject.sponsor;
        trial.country = CountryEnum[rawObject.country.toUpperCase()];
        trial.end_date = new Date(rawObject.end_date);
        trial.start_date = new Date(rawObject.start_date);

        return trial
    }
}