import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>
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
    return user;
  }
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
