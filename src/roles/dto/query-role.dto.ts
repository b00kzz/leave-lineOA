import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { FindOptionsOrderValue, ILike } from 'typeorm';

export class FilterRole {
  @ApiProperty({ example: '' })
  @IsOptional()
  name?: any = '';
  @ApiProperty({ example: '' })
  @IsOptional()
  names?: string[] = [];

  @ApiProperty({ example: '' })
  @IsOptional()
  nameLocal?: string;

  @IsOptional()
  searchText?: string = '';

  @IsOptional()
  take?: number;

  @IsOptional()
  skip?: number;

  @IsString()
  @IsOptional()
  orderBy?: FindOptionsOrderValue;

  FilterList() {
    const output: FilterRole = {} as FilterRole;
    if (this.name !== '') {
      output.name = ILike(`%${this.name}%`);
    }
    if (this.names.length > 0) {
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
