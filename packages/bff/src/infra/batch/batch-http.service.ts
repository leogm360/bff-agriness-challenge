import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Batch } from '@agriness/data/prisma';
import { CreateBatchDto, UpdateBatchDto } from '@agriness/domain/dtos';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { createLinkFromQueries } from '@utils';
import { Queries } from '@types';

@Injectable()
export class BatchHttpService {
  private readonly path = '/batch';

  constructor(private readonly httpService: HttpService) {}

  async getBatches(queries: Queries): Promise<Batch[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<Batch[]>(createLinkFromQueries(this.path, queries))
        .pipe(
          catchError((error: AxiosError) => {
            throw error;
          }),
        ),
    );

    return data;
  }

  async getBatchById(id: string): Promise<Batch> {
    const { data } = await firstValueFrom(
      this.httpService.get<Batch>(`${this.path}/${id}`).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );

    return data;
  }

  async getBatchByCode(code: string): Promise<Batch[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Batch[]>(`${this.path}?q=code:equals:${code}`).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );

    return data;
  }

  async getBatchByName(name: string): Promise<Batch[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Batch[]>(`${this.path}?q=name:equals:${name}`).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );

    return data;
  }

  async createBatch(data: CreateBatchDto): Promise<Batch> {
    const { data: dataRes } = await firstValueFrom(
      this.httpService.post(this.path, data).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );

    return dataRes;
  }

  async updateBatch(id: string, data: UpdateBatchDto): Promise<Batch> {
    const { data: dataRes } = await firstValueFrom(
      this.httpService.patch<Batch>(`${this.path}/${id}`, data).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );

    return dataRes;
  }

  async deleteBatch(id: string): Promise<Batch> {
    const { data } = await firstValueFrom(
      this.httpService.delete<Batch>(`${this.path}/${id}`).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );

    return data;
  }
}
