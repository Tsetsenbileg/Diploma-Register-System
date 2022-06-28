import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsEmail } from "class-validator";

export class CreateTeacherDto {

    @ApiProperty()
    @IsString()
    firstname: string;

    @ApiProperty()
    @IsString()
    lastname: string;

    @ApiProperty()
    @IsString()
    degree: string;

    @ApiProperty()
    @IsNumber()
    phonenumber: number;

    @ApiProperty()
    @IsString()
    photo_url: string;

    @ApiProperty()
    @IsNumber()
    departmentId: number;

    @ApiProperty()
    @IsEmail()
    email: string;


}