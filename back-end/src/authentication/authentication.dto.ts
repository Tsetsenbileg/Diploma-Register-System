import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, IsNumber } from "class-validator"
export class LoginDto {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;
}

export class RegisterAuthDto {

    @ApiProperty()
    @IsString()
    firstname: string;

    @ApiProperty()
    @IsString()
    lastname: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNumber()
    phonenumber: number;

    @ApiProperty()
    @IsString()
    role?: string;

    @ApiProperty()
    @IsString()
    university_name: string;

    @ApiProperty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsString()
    icon_url: string;

    @ApiProperty()
    @IsNumber()
    university_number: number;

    @ApiProperty()
    @IsString()
    description: string;
}
export class SuperRegisterDto {
    @ApiProperty({
        description: "Firstname of the admin",
        example: "John",
    })
    @IsString()
    firstname: string

    @ApiProperty({
        description: "Lastname of the admin",
        example: "Doe",
    })
    @IsString()
    lastname: string

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    password: string;
}