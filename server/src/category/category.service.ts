import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>
  ) { }


  async create(createCategoryDto: CreateCategoryDto, id: number) {
    const isEmpty = await this.categoriesRepository.findBy({
      user: { id },
      title: createCategoryDto.title,
    });
    if (isEmpty.length)
      throw new BadRequestException('Такая категория уже существует')
    const category = {
      title: createCategoryDto.title,
      color: createCategoryDto.color,
      user: {
        id
      }
    }
    return await this.categoriesRepository.save(category);
  }
  async findAll(id: number) {
    return await this.categoriesRepository.find({
      where: {
        user: {
          id
        }
      },
      relations: {
        transactions: true
      }
    });
  }
  async findOne(id: number) {
    const category = await this.categoriesRepository.findOne({
      where: { id },
      relations: {
        transactions: true
      }
    });
    if (!category)
      throw new NotFoundException('Категория не найдена')
    return category;
  }
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.findOne({
      where: { id }
    });
    if (!category)
      throw new NotFoundException('Категория не найдена');
    return await this.categoriesRepository.update(id, updateCategoryDto);
  }
  async remove(id: number) {
    const category = await this.categoriesRepository.findOne({
      where: { id }
    });
    if (!category)
      throw new NotFoundException('Категория не найдена');
    return await this.categoriesRepository.delete(id);
  }
}
