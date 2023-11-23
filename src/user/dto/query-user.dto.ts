import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { FindOptionsOrderValue, ILike } from 'typeorm';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UserFilterDto {
  @ApiProperty({ example: 'Juna' })
  @IsOptional()
  searchText?: string = '';

  @ApiProperty({ example: 'chaloemchai' })
  @IsOptional()
  firstName: any = '';

  @ApiProperty({ example: 'chaloemchai' })
  @IsOptional()
  firstNameLocal?: any = '';

  @ApiProperty({ example: 'chaloemchai' })
  @IsOptional()
  lastName?: any = '';

  @ApiProperty({ example: 'chaloemchai' })
  @IsOptional()
  lastNameLocal?: any = '';

  @ApiProperty({ example: ['chaloemchai', 'chaloemchai2', 'chaloemchai3'] })
  @IsOptional()
  firstNames?: string[] = [];

  @ApiProperty({ example: 10 })
  @IsOptional()
  @IsNumber()
  take?: number; // 10

  @ApiProperty({ example: 0 })
  @IsOptional()
  @IsNumber()
  skip?: number; // 0

  @IsString()
  orderBy: FindOptionsOrderValue;

  Filterlist() {
    const output: UserFilterDto = {} as UserFilterDto;
    if (this.firstName !== '') {
      output.firstName = ILike(`%${this.firstName}%`);
    }
    if (this.firstNameLocal !== '') {
      output.firstNameLocal = ILike(`%${this.firstNameLocal}%`);
    }
    if (this.lastName !== '') {
      output.lastName = ILike(`%${this.lastName}%`);
    }
    if (this.lastNameLocal !== '') {
      output.lastNameLocal = ILike(`%${this.lastNameLocal}%`);
    }
    if (this.firstNames?.length > 0) {
      output.firstNames = this.firstNames;
    }
    return output;
  }

  SearchText() {
    if (this.searchText !== '') {
      return [
        { username: ILike(`%${this.searchText}%`) },
        { firstName: ILike(`%${this.searchText}%`) },
        { firstNameLocal: ILike(`%${this.searchText}%`) },
        { lastName: ILike(`%${this.searchText}%`) },
        { lastNameLocal: ILike(`%${this.searchText}%`) },
      ];
    }
  }
}
