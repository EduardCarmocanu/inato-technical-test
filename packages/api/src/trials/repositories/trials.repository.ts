import { Injectable } from "@nestjs/common";
import { TrialModel } from "../models/trial.model";
import { TrialMapper } from "../mappers/trial.mapper";
import { IRawTrial } from "../interfaces/raw-trial.interface";

const rawTrials: IRawTrial[] = require('../../../trials.json')

@Injectable()
export class TrialsRepository {
    constructor(private trialMapper: TrialMapper) {}

    public async getTrials(): Promise<TrialModel[]> {
        return rawTrials.map(this.trialMapper.map)
    }
}