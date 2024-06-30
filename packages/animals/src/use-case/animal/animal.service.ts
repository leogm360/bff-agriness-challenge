import { PrismaService, Animal } from '@agriness/data/prisma';
import { CreateAnimalDto, UpdateAnimalDto } from '@agriness/domain/dtos';
import {
  FilteredFields,
  SortedFields,
  PaginatedFields,
} from '@agriness/domain/types';

export class AnimalService {
  constructor(private readonly prisma: PrismaService) {}

  public async getAnimals(
    filter: FilteredFields,
    sort: SortedFields,
    pagination: PaginatedFields,
  ): Promise<Animal[]> {
    return this.prisma.animal.findMany({
      where: {
        ...filter,
      },
      orderBy: {
        ...sort,
      },
      include: { batch: true },
      skip: pagination.offset,
      take: pagination.limit,
    });
  }

  public async getAnimalById(id: string): Promise<Animal> {
    return this.prisma.animal.findUnique({ where: { id } });
  }

  public async createAnimal(data: CreateAnimalDto): Promise<Animal> {
    return this.prisma.animal.create({ data });
  }

  public async updateAnimal(
    id: string,
    data: UpdateAnimalDto,
  ): Promise<Animal> {
    return this.prisma.animal.update({ where: { id }, data });
  }

  public async deleteAnimal(id: string): Promise<Animal> {
    return this.prisma.animal.delete({ where: { id } });
  }
}
