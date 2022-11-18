import path from 'path';
import { Database } from 'sqlite3';

const fileDatabaseDir = path.join(__dirname, '..', 'database', 'database.sqlite');

export const openConnection = () => {
    let db = new Database(fileDatabaseDir);
    return db;
}