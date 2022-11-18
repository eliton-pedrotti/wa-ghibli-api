import { readdir, readFile } from "fs";
import path from "path";
import { openConnection } from "./connection";

const fileDatabaseDir = path.join(__dirname, 'migrations');

(async () => {
    readdir(fileDatabaseDir, (err, files: string[]) => {
        if (err) {
            console.error(err);
        }
        files.forEach((file) => {
            readFile(path.join(fileDatabaseDir, file), async (err, content) => {
                if (err) {
                    console.error(err)
                }
                const runMigrationQuery = content.toString();
                openConnection().exec(runMigrationQuery);
            });
        })
    })
})();

