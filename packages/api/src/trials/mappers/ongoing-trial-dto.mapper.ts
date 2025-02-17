import { Injectable } from "@nestjs/common";
import { IMapper } from "../interfaces/mapper.interface";
import { TrialModel } from "../models/trial.model";
import { OngoingTrialDTO } from "../dtos/ongoing-trials.dto";

@Injectable()
export class OngoingTrailDTOMapper implements IMapper<TrialModel, OngoingTrialDTO> {
    private zeroPad = (value: number): string => {
        if (value < 10) {
            return '0' + value
        }

        return value.toString();
    }

    private getFormattedDate(date: Date): string {
        return `${this.zeroPad(date.getUTCFullYear())}-${this.zeroPad(date.getUTCMonth() + 1)}-${this.zeroPad(date.getUTCDate())}`
    }

    map = (mappingObject: TrialModel): OngoingTrialDTO => {
        const ongoingTrialDto = new OngoingTrialDTO();

        ongoingTrialDto.name = mappingObject.name;
        ongoingTrialDto.end_date = this.getFormattedDate(mappingObject.end_date)
        ongoingTrialDto.start_date = this.getFormattedDate(mappingObject.start_date)
        ongoingTrialDto.sponsor = mappingObject.sponsor

        return ongoingTrialDto
    }
}