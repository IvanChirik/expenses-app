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
      password: await bcrypt.hash(createUserDto.password, 5)
    })
    const token = this.jwtService.sign({ id: user.id, email: user.email })
    return { user, token };
  }
  async findOne(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }
}
