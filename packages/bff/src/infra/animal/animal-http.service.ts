import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Animal } from '@agriness/data/prisma';
import { CreateAnimalDto, UpdateAnimalDto } from '@agriness/domain/dtos';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { createLinkFromQueries } from '@utils';
import { Queries } from '@types';

@Injectable()
export class AnimalHttpService {
  private readonly path = '/animal';

  constructor(private readonly httpService: HttpService) {}

  async getAnimals(queries?: Queries): Promise<Animal[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<Animal[]>(createLinkFromQueries(this.path, queries))
        .pipe(
          catchError((error: AxiosError) => {
            throw error;
          }),
        ),
    );

    return data;
  }

  async getAnimalById(id: string): Promise<Animal> {
    const { data } = await firstValueFrom(
      this.httpService.get<Animal>(`${this.path}/${id}`).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );

    return data;
  }

  async getAnimalsByCode(code: string): Promise<Animal[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Animal[]>(`${this.path}?q=code:equals:${code}`).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );

    return data;
  }

  async getAnimalsByName(name: string): Promise<Animal[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Animal[]>(`${this.path}?q=name:equals:${name}`).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );

    return data;
  }

  async createAnimal(data: CreateAnimalDto): Promise<Animal> {
    const { data: dataRes } = await firstValueFrom(
      this.httpService.post(this.path, data).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );

    return dataRes;
  }

  async updateAnimal(id: string, data: UpdateAnimalDto): Promise<Animal> {
    const { data: dataRes } = await firstValueFrom(
      this.httpService.patch<Animal>(`${this.path}/${id}`, data).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );

    return dataRes;
  }

  async deleteAnimal(id: string): Promise<Animal> {
    const { data } = await firstValueFrom(
      this.httpService.delete<Animal>(`${this.path}/${id}`).pipe(
        catchError((error: AxiosError) => {
          throw error;
        }),
      ),
    );

    return data;
  }
}
