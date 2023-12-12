import { ApiProperty } from '@nestjs/swagger';
import { FindOptionsOrderValue, ILike } from 'typeorm';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterLeaveTypeDto {
    @ApiProperty({ example: 'Juna' })
    @IsOptional()
    searchText?: string = '';

    @ApiProperty({ example: '' })
    @IsOptional()
    code: any = "";

    @ApiProperty({ example: '' })
    @IsOptional()
    name: any = '';

    @ApiProperty({ example: 'ลาป่วย' })
    @IsOptional()
    nameLocal?: any = '';

    @ApiProperty({ example: 'chaloemchai' })
    @IsOptional()
    description?: any = '';

    @ApiProperty({ example: ['', '', ''] })
    @IsOptional()
    names?: string[] = [];

    @ApiProperty({ example: ['ลาป่วย1', 'ลาป่วย2', 'ลาป่วย3'] })
    @IsOptional()
    namesLocal?: string[] = [];

    @ApiProperty({ example: 10 })
    @IsOptional()
    @IsNumber()
    take?: number; // 10

    @ApiProperty({ example: 0 })
    @IsOptional()
    @IsNumber()
    skip?: number; // 0

    @IsString()
    @ApiProperty({
        description: 'Choose among ASC, DESC, asc, or desc',
        example: 'ASC',
    })
    orderBy: FindOptionsOrderValue;

    Filterlist() {
        const output: FilterLeaveTypeDto = {} as FilterLeaveTypeDto;
        if (this.name !== '') {
            output.name = ILike(`%${this.name}%`);
        }
        if (this.nameLocal !== '') {
            output.nameLocal = ILike(`%${this.nameLocal}%`);
        }
        if (this.description !== '') {
            output.description = ILike(`%${this.description}%`);
        }
        if (this.code !== '') {
            output.code = ILike(`%${this.code}%`);
        }
        if (this.names?.length > 0) {
            output.names = this.names;
        }
        if (this.namesLocal?.length > 0) {
            output.namesLocal = this.namesLocal;
        }
        return output;
    }

    SearchText() {
        if (this.searchText !== '') {
            return [
                { naame: ILike(`%${this.searchText}%`) },
                { nameLocal: ILike(`%${this.searchText}%`) },
                { code: ILike(`%${this.searchText}%`) },
                { description: ILike(`%${this.searchText}%`) },
            ];
        }
    }
}
