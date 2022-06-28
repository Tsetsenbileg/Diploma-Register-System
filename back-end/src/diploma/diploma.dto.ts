import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsArray } from "class-validator";
export class CreateDiplomaDto {

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    year: string;

    @ApiProperty()
    @IsString()
    file: string;

    @ApiProperty()
    @IsArray()
    firstname: string;

    @ApiProperty()
    @IsArray()
    lastname: string;

    @ApiProperty()
    @IsArray()
    studentId: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNumber()
    departmentId: number;

    @ApiProperty()
    @IsArray()
    teachers: number[];
}