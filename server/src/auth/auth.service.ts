import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/interfaces/interfaces';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    const passwordIsMatch = await bcrypt.compare(password, user?.password);
    if (!passwordIsMatch) throw new UnauthorizedException('Неверный пароль.')
    if (user && passwordIsMatch)
      return user
  }
  async login(user: IUser) {
    const { id, email, name } = user;
    return {
      id,
      email,
      name,
      access_token: this.jwtService.sign({ id, email, name }),
    };
  }
}
