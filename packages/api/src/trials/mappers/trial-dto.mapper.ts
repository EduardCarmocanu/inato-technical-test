import { Injectable } from "@nestjs/common";
import { IMapper } from "../interfaces/mapper.interface";
import { TrialModel } from "../models/trial.model";
import { TrialDTO } from "../dtos/ongoing-trials.dto";

@Injectable()
export class TrialDTOMapper implements IMapper<TrialModel, TrialDTO> {
    private zeroPad = (value: number): string => {
        if (value < 10) {
            return '0' + value
        }

        return value.toString();
    }

    private getFormattedDate(date: Date): string {
        return `${date.getUTCFullYear()}-${this.zeroPad(date.getUTCMonth() + 1)}-${this.zeroPad(date.getUTCDate())}`
    }

    map = (mappingObject: TrialModel): TrialDTO => {
        const ongoingTrialDto = new TrialDTO();

        ongoingTrialDto.name = mappingObject.name;
        ongoingTrialDto.end_date = this.getFormattedDate(mappingObject.end_date)
        ongoingTrialDto.start_date = this.getFormattedDate(mappingObject.start_date)
        ongoingTrialDto.sponsor = mappingObject.sponsor

        return ongoingTrialDto
    }
}