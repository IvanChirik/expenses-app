import { IsEmail, MinLength } from "class-validator"

export class CreateUserDto {
    @IsEmail({}, { message: 'Email должен иметь форму email' })
    email: string
    @MinLength(6, { message: 'Пароль должен содержать не меньше 6 символов' })
    password: string
    @MinLength(2, { message: 'Имя не может быть меньше двух букв' })
    name: string
}
