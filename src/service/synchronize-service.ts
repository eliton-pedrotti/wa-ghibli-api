import { HttpClient } from "../client/http";
import { SynchronizeRepository } from "../repository/synchronize-repository";
import { Films } from "../types/films";
import { MessageResponse } from "../types/response";


export class SynchronizeService {

    BASE_URL: string = "https://ghibliapi.herokuapp.com";
    PATH: string = "films";

    constructor(
        private http: HttpClient,
        private synchronizeRepository: SynchronizeRepository
    ) { }

    public async synchronize(): Promise<MessageResponse> {
        const films = await this.http.get(`${this.BASE_URL}/${this.PATH}`) as string;
        const filmsParsed: Films[] = JSON.parse(films);

        const filmsTransformedToSave: string[] = filmsParsed.map((film) => {
            return `("${film.title}","${film.original_title}","${film.description}","${film.release_date}","${film.rt_score}")`
        })

        const formatStringValues = filmsTransformedToSave.join(',');
        await this.synchronizeRepository.synchronizeDatabase(formatStringValues);

        return {
            message: "Base sincronizada!"
        }
    }
}