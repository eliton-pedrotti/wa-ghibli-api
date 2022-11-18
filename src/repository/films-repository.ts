import { QueryDatabase } from "../database/query";
import { FilmsFormatted } from "../types/films";

export class FilmsRepository {

    constructor(private databaseQuery: QueryDatabase) { }

    public async listFilms(limit?: string, offset?: string): Promise<FilmsFormatted[]> {

        let sql: string;

        if (limit && offset) {
            sql = `
            SELECT * FROM films ORDER BY data_lancamento DESC LIMIT ${limit} OFFSET ${offset}
        `;

            return await this.databaseQuery.query(sql) as FilmsFormatted[];;
        }

        if (limit) {
            sql = `
            SELECT * FROM films ORDER BY data_lancamento DESC LIMIT ${limit}
        `;

            return await this.databaseQuery.query(sql) as FilmsFormatted[];
        }

        sql = `
            SELECT * FROM films
        `;

        return await this.databaseQuery.query(sql) as FilmsFormatted[];;
    }
}