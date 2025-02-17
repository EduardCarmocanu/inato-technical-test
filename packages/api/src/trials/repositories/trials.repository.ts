import { Injectable } from "@nestjs/common";
import { TrialModel } from "../models/trial.model";
import { TrialMapper } from "../mappers/trial.mapper";
import { IRawTrial } from "../interfaces/raw-trial.interface";



@Injectable()
export class TrialsRepository {
    private rawTrials: IRawTrial[] = require('../../../trials.json')

    constructor(private trialMapper: TrialMapper) {}

    public async getTrials(): Promise<TrialModel[]> {
        return this.rawTrials.map(this.trialMapper.map)
    }
}