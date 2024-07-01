import { Test, TestingModule } from '@nestjs/testing';
import { BacthService } from './batch.service';
import { BatchHttpService } from '@infra/batch';
import { AnimalHttpService } from '@infra/animal';
import { ConflictException } from '@nestjs/common';

describe('BacthService', () => {
  let batchService: BacthService;
  let batchHttpService: BatchHttpService;
  let animalHttpService: AnimalHttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BacthService,
        {
          provide: BatchHttpService,
          useValue: {
            getBatches: jest.fn(),
            getBatchById: jest.fn(),
            getBatchByName: jest.fn(),
            getBatchByCode: jest.fn(),
            createBatch: jest.fn(),
            updateBatch: jest.fn(),
            deleteBatch: jest.fn(),
          },
        },
        {
          provide: AnimalHttpService,
          useValue: {
            getAnimals: jest.fn(),
          },
        },
      ],
    }).compile();

    batchService = module.get<BacthService>(BacthService);
    batchHttpService = module.get<BatchHttpService>(BatchHttpService);
    animalHttpService = module.get<AnimalHttpService>(AnimalHttpService);
  });

  it('should call getBatches method of BatchHttpService with the provided queries', async () => {
    const queries = {};

    await batchService.getBatches(queries);

    expect(batchHttpService.getBatches).toHaveBeenCalledWith(queries);
  });

  it('should call getBatches method of BatchHttpService with the provided queries', async () => {
    const queries = {
      filter: 'name:equals:Batch 1{AND}code:equals:123',
      sort: 'name:asc,code:desc',
      include: 'batch',
      pagination: 'page=1&size=10',
    };

    await batchService.getBatches(queries);

    expect(batchHttpService.getBatches).toHaveBeenCalledWith(queries);
  });

  it('should call getBatchById method of BatchHttpService with the provided id', async () => {
    const id = '49e2ae19-8a75-43ce-b60a-c663c3ded2ba';

    await batchService.getBatchById(id);

    expect(batchHttpService.getBatchById).toHaveBeenCalledWith(id);
  });

  it('should throw ConflictException if a batch with the same name already exists when createBatch is called', async () => {
    const data = {
      name: 'Batch 1',
      code: '123',
    };

    jest.spyOn(batchHttpService, 'getBatchByName').mockResolvedValue([
      {
        id: '49e2ae19-8a75-43ce-b60a-c663c3ded2ba',
        name: 'Batch 1',
        code: '123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    jest.spyOn(batchHttpService, 'getBatchByCode').mockResolvedValue([]);

    await expect(batchService.createBatch(data)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if a batch with the same code already exists when createBatch is called', async () => {
    const data = {
      name: 'Batch 2',
      code: '456',
    };

    jest.spyOn(batchHttpService, 'getBatchByName').mockResolvedValue([]);

    jest.spyOn(batchHttpService, 'getBatchByCode').mockResolvedValue([
      {
        id: 'e411e142-6b4f-4a06-a378-ff4411d67d9b',
        name: 'Batch 1',
        code: '123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await expect(batchService.createBatch(data)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should call createBatch method of BatchHttpService with the provided data if no conflicts', async () => {
    const data = {
      name: 'Batch 3',
      code: '789',
    };

    jest.spyOn(batchHttpService, 'getBatchByName').mockResolvedValue([]);

    jest.spyOn(batchHttpService, 'getBatchByCode').mockResolvedValue([]);

    await batchService.createBatch(data);

    expect(batchHttpService.createBatch).toHaveBeenCalledWith(data);
  });

  it('should throw ConflictException if a batch with the same name already exists and has a different id when updateBatch is called', async () => {
    const id = '4edbb149-2867-4d68-a614-71543cafa954';

    const data = {
      name: 'Batch 1',
    };

    jest.spyOn(batchHttpService, 'getBatchByName').mockResolvedValue([
      {
        id: '49e2ae19-8a75-43ce-b60a-c663c3ded2ba',
        name: 'Batch 1',
        code: '123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    jest.spyOn(batchHttpService, 'getBatchByCode').mockResolvedValue([]);

    await expect(batchService.updateBatch(id, data)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if a batch with the same code already exists and has a different id when updateBatch is called', async () => {
    const id = '4edbb149-2867-4d68-a614-71543cafa954';

    const data = {
      code: '123',
    };

    jest.spyOn(batchHttpService, 'getBatchByName').mockResolvedValue([]);

    jest.spyOn(batchHttpService, 'getBatchByCode').mockResolvedValue([
      {
        id: '49e2ae19-8a75-43ce-b60a-c663c3ded2ba',
        name: 'Batch 1',
        code: '123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await expect(batchService.updateBatch(id, data)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should call updateBatch method of BatchHttpService with the provided id and data', async () => {
    const id = 'fb9cfd38-5716-49b5-a043-b8e5827c89a2';

    const data = {
      name: 'Batch 1',
    };

    jest.spyOn(batchHttpService, 'getBatchByName').mockResolvedValue([]);

    jest.spyOn(batchHttpService, 'getBatchByCode').mockResolvedValue([]);

    await batchService.updateBatch(id, data);

    expect(batchHttpService.updateBatch).toHaveBeenCalledWith(id, data);
  });

  it('should throw ConflictException if there are animals associated with the batch', async () => {
    const id = '95414163-d2fe-45b3-8f5c-68ab2b3bef26';

    jest.spyOn(animalHttpService, 'getAnimals').mockResolvedValue([
      {
        id: '49e2ae19-8a75-43ce-b60a-c663c3ded2ba',
        name: 'Animal 1',
        code: '123',
        batchId: '95414163-d2fe-45b3-8f5c-68ab2b3bef26',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await expect(batchService.deleteBatch(id)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should call deleteBatch method of BatchHttpService with the provided id', async () => {
    const id = 'a2f2d1e5-7a88-4c07-a39f-adc6a2d30507';

    jest.spyOn(animalHttpService, 'getAnimals').mockResolvedValue([]);

    await batchService.deleteBatch(id);

    expect(batchHttpService.deleteBatch).toHaveBeenCalledWith(id);
  });
});
