import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { CountryEnum } from "../enums/country.enum";
import { Transform } from "class-transformer";

export class OngoingTrialQueryDto {
    @Transform((params) => params.value.toUpperCase())
    @IsEnum(CountryEnum)
    @IsOptional()
    country?: CountryEnum;
    
    @IsString({})
    @MaxLength(100)
    @MinLength(1)
    @IsOptional()
    sponsor?: string
}