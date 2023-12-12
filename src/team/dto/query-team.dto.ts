import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { FindOptionsOrderValue, ILike } from 'typeorm';

export class TeamFilter {
  @IsNumber()
  @ApiProperty({ example: 1 })
  @IsOptional()
  mainTeamId?: number;

  @IsString()
  @ApiProperty({ example: 'Delivery' })
  name?: any = '';

  @IsOptional()
  @ApiProperty({ example: '' })
  names?: string[] = [];

  @IsOptional()
  @ApiProperty({ example: '' })
  nameLocal?: string;

  @ApiProperty({ example: 'Delivery' })
  @IsOptional()
  searchText?: string = '';

  @ApiProperty({ example: 10 })
  @IsOptional()
  take?: number; // 10

  @ApiProperty({ example: 0 })
  @IsOptional()
  skip?: number; // 0

  @IsOptional()
  deleteAt?: Date = null

  @ApiProperty({
    description: 'Choose among ASC, DESC, asc, or desc',
    example: 'ASC',
  })
  @IsString()
  orderBy: FindOptionsOrderValue;

  FilterList() {
    const output: TeamFilter = {} as TeamFilter;
    if (this.name !== '') {
      output.name = ILike(`%${this.name}%`);
    }

    if (this.mainTeamId !== null) {
      output.mainTeamId = this.mainTeamId;
    }

    if (this.names?.length > 0) {
      output.names = this.names;
    }
    return output;
  }

  SearchText() {
    if (this.searchText !== '') {
      return [
        { name: ILike(`%${this.searchText}%`) },
        { nameLocal: ILike(`%${this.searchText}%`) },
      ];
    }
  }
}
