import { Test, TestingModule } from '@nestjs/testing';
import { AnimalService } from './animal.service';
import { AnimalHttpService } from '@infra/animal';
import { ConflictException } from '@nestjs/common';

describe('AnimalService', () => {
  let animalService: AnimalService;
  let animalHttpService: AnimalHttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnimalService,
        {
          provide: AnimalHttpService,
          useValue: {
            getAnimals: jest.fn(),
            getAnimalById: jest.fn(),
            getAnimalsByName: jest.fn(),
            getAnimalsByCode: jest.fn(),
            createAnimal: jest.fn(),
            updateAnimal: jest.fn(),
            deleteAnimal: jest.fn(),
          },
        },
      ],
    }).compile();

    animalService = module.get<AnimalService>(AnimalService);
    animalHttpService = module.get<AnimalHttpService>(AnimalHttpService);
  });

  it('should call getAnimals method of AnimalHttpService without queries', async () => {
    const queries = {};

    await animalService.getAnimals(queries);

    expect(animalHttpService.getAnimals).toHaveBeenCalledWith(queries);
  });

  it('should call getAnimals method of AnimalHttpService with queries', async () => {
    const queries = {
      filter: 'name:equals:Animal 1{AND}code:equals:123',
      sort: 'name:asc,code:desc',
      include: 'batch',
      pagination: 'page=1&size=10',
    };

    await animalService.getAnimals(queries);

    expect(animalHttpService.getAnimals).toHaveBeenCalledWith(queries);
  });

  it('should call getAnimalById method of AnimalHttpService with the provided id', async () => {
    const id = '7076f314-2796-4de0-a4b5-edf80e925045';

    await animalService.getAnimalById(id);

    expect(animalHttpService.getAnimalById).toHaveBeenCalledWith(id);
  });

  it('should throw ConflictException if a animal with the same name already exists when createAnimal is called', async () => {
    const data = {
      name: 'Animal 1',
      code: '123',
      batchId: 'bae187a9-2f06-425b-9d99-854a65703709',
    };

    jest.spyOn(animalHttpService, 'getAnimalsByName').mockResolvedValue([
      {
        id: '7076f314-2796-4de0-a4b5-edf80e925045',
        name: 'Animal 1',
        code: '123',
        batchId: 'bae187a9-2f06-425b-9d99-854a65703709',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    jest.spyOn(animalHttpService, 'getAnimalsByCode').mockResolvedValue([]);

    await expect(animalService.createAnimal(data)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if a animal with the same code already exists when createAnimal is called', async () => {
    const data = {
      name: 'Animal 2',
      code: '456',
      batchId: 'bae187a9-2f06-425b-9d99-854a65703709',
    };

    jest.spyOn(animalHttpService, 'getAnimalsByName').mockResolvedValue([]);

    jest.spyOn(animalHttpService, 'getAnimalsByCode').mockResolvedValue([
      {
        id: '521130a4-db09-4c20-ab77-ae4723096070',
        name: 'Animal 2',
        code: '456',
        batchId: 'bae187a9-2f06-425b-9d99-854a65703709',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await expect(animalService.createAnimal(data)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should call createAnimal method of AnimalHttpService with the provided data if no conflicts', async () => {
    const data = {
      name: 'Animal 3',
      code: '789',
      batchId: 'bae187a9-2f06-425b-9d99-854a65703709',
    };

    jest.spyOn(animalHttpService, 'getAnimalsByName').mockResolvedValue([]);

    jest.spyOn(animalHttpService, 'getAnimalsByCode').mockResolvedValue([]);

    await animalService.createAnimal(data);

    expect(animalHttpService.createAnimal).toHaveBeenCalledWith(data);
  });

  it('should throw ConflictException if a animal with the same name and has a different id already exists when updateAnimal is called', async () => {
    const id = '7fd086f8-17f2-481c-90e7-408e8bd4dca4';

    const data = {
      name: 'Animal 4',
    };

    jest.spyOn(animalHttpService, 'getAnimalsByName').mockResolvedValue([
      {
        id: '7076f314-2796-4de0-a4b5-edf80e925045',
        name: 'Animal 1',
        code: '123',
        batchId: 'bae187a9-2f06-425b-9d99-854a65703709',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    jest.spyOn(animalHttpService, 'getAnimalsByCode').mockResolvedValue([]);

    await expect(animalService.updateAnimal(id, data)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if a animal with the same code and has a different id already exists when updateAnimal is called', async () => {
    const id = '7fd086f8-17f2-481c-90e7-408e8bd4dca4';

    const data = {
      name: 'Animal 4',
    };

    jest.spyOn(animalHttpService, 'getAnimalsByName').mockResolvedValue([]);

    jest.spyOn(animalHttpService, 'getAnimalsByCode').mockResolvedValue([
      {
        id: '7076f314-2796-4de0-a4b5-edf80e925045',
        name: 'Animal 1',
        code: '123',
        batchId: 'bae187a9-2f06-425b-9d99-854a65703709',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await expect(animalService.updateAnimal(id, data)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should call updateAnimal method of AnimalHttpService with the provided id and data', async () => {
    const id = '7076f314-2796-4de0-a4b5-edf80e925045';

    const data = {
      name: 'Animal 4',
    };

    jest.spyOn(animalHttpService, 'getAnimalsByName').mockResolvedValue([]);

    jest.spyOn(animalHttpService, 'getAnimalsByCode').mockResolvedValue([]);

    await animalService.updateAnimal(id, data);

    expect(animalHttpService.updateAnimal).toHaveBeenCalledWith(id, data);
  });

  it('should call deleteAnimal method of AnimalHttpService with the provided id', async () => {
    const id = 'bae187a9-2f06-425b-9d99-854a65703709';

    await animalService.deleteAnimal(id);

    expect(animalHttpService.deleteAnimal).toHaveBeenCalledWith(id);
  });

  it('should call deleteAnimal method of AnimalHttpService with the provided id', async () => {
    const id = 'bae187a9-2f06-425b-9d99-854a65703709';

    await animalService.deleteAnimal(id);

    expect(animalHttpService.deleteAnimal).toHaveBeenCalledWith(id);
  });
});
