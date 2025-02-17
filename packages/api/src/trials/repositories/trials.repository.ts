import { Injectable } from "@nestjs/common";
import { readFile } from "fs/promises";
import { resolve as resolvePath } from "path";
import { TrialModel } from "../models/trial.model";
import { TrialMapper } from "../mappers/trial.mapper";

@Injectable()
export class TrialsRepository {
    constructor(private trialMapper: TrialMapper) {}

    public async getTrials(): Promise<TrialModel[]> {
        const rawTrials = JSON.parse(await readFile(resolvePath('./trials.json'), 'utf-8'))

        return rawTrials.map(this.trialMapper.map)
    }
}