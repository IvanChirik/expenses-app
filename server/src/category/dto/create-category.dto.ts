import { IsHexColor, IsNotEmpty, IsOptional } from "class-validator";
import { Users } from "src/user/entities/user.entity";

export class CreateCategoryDto {
    @IsNotEmpty()
    title: string;
    @IsOptional()
    user?: Users
    @IsHexColor()
    color: string;
}
