import { PrismaClient, Animal } from '@agriness/data/prisma';
import { CreateAnimalDto, UpdateAnimalDto } from '@agriness/domain/dtos';
import {
  FilteredFields,
  SortedFields,
  IncludedFields,
  PaginatedFields,
} from '@agriness/domain/types';

export class AnimalService {
  private readonly prisma: PrismaClient = new PrismaClient();

  public async getAnimals(
    filter: FilteredFields,
    sort: SortedFields,
    include: IncludedFields,
    pagination: PaginatedFields,
  ): Promise<Animal[]> {
    return this.prisma.animal.findMany({
      where: filter,
      orderBy: sort,
      include: include,
      skip: pagination.offset,
      take: pagination.limit,
    });
  }

  public async getAnimalById(
    id: string,
    include: IncludedFields,
  ): Promise<Animal> {
    return this.prisma.animal.findUnique({ where: { id }, include });
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
