import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateHolidayDto {
    @IsDateString()
    date: string;

    @IsNotEmpty()
    @IsString()
    nameLocal: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}
