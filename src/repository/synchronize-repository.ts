import { QueryDatabase } from "../database/query";

export class SynchronizeRepository {

    constructor(private databaseQuery: QueryDatabase) { }

    public async synchronizeDatabase(values: string) {

        let sql = `
            INSERT INTO films (titulo, titulo_original, descricao, data_lancamento, pontuacao)
            VALUES ${values}
        `;

        return await this.databaseQuery.query(sql);
    }
}