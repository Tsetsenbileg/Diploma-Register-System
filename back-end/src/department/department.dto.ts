
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateDepartmentDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    description: string;

}