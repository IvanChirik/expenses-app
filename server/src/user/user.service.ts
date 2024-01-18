import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService
  ) {

  }
  async create(createUserDto: CreateUserDto) {
    const candidate = await this.userRepository.findOne({
      where: {
        email: createUserDto.email
      }
    });
    if (candidate) throw new BadRequestException(`Пользователь с email - ${createUserDto.email} уже существует`);
    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, 5),
      name: createUserDto.name
    })
    const token = this.jwtService.sign({ id: user.id, email: user.email, name: user.name })
    return { id: user.id, email: user.email, name: user.name, access_token: token };
  }
  async findOne(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user)
      throw new BadRequestException(`Пользователя с email - ${email} не существует.`);
    return user;
  }
}
