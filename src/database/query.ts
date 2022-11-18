import { Database } from "sqlite3";
import { openConnection } from "./connection";

export class QueryDatabase {
    public async query(query: string) {
        let db: Database = openConnection();
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            })
        })
            .finally(() => {
                db.close();
            })
    }
}