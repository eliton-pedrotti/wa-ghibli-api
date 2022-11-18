import { FilmsRepository } from "../repository/films-repository";
import { FilmsFormatted } from "../types/films";

export class FilmsService {
    constructor(private filmsRepository: FilmsRepository) { }

    public async listFilms(limit?: string, offset?: string): Promise<FilmsFormatted[]> {
        return await this.filmsRepository.listFilms(limit, offset);
    }
}