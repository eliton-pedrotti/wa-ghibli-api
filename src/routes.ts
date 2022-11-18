import { parse, UrlWithParsedQuery } from 'url';
import { ParsedUrlQuery } from 'querystring';
import { IncomingMessage, ServerResponse } from 'http';
import { SynchronizeService } from './service/synchronize-service';
import { HttpClient } from './client/http';
import { SynchronizeRepository } from './repository/synchronize-repository';
import { QueryDatabase } from './database/query';
import { FilmsRepository } from './repository/films-repository';
import { FilmsService } from './service/films-service';

export const routes = async (req: IncomingMessage, res: ServerResponse) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", '*');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const urlparse: UrlWithParsedQuery = parse(req.url, true);

    /**Synchronize database */
    if (urlparse.pathname == '/synchronize' && req.method == 'POST') {

        const httpClient = new HttpClient();
        const query = new QueryDatabase();
        const synchronizeRepository = new SynchronizeRepository(query);
        const synchronizeService = new SynchronizeService(httpClient, synchronizeRepository);
        const response = await synchronizeService.synchronize();

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response, null, 2));
    }

    /**GET */
    if (urlparse.pathname == '/films' && req.method == 'GET') {

        let limitParam: string | null;
        let offsetParam: string | null;;

        const verifyIfQueryParamsExists: ParsedUrlQuery = urlparse.query;
        const size = Object.keys(verifyIfQueryParamsExists).length;

        if (size > 0) {
            const { limit, offset } = verifyIfQueryParamsExists;
            limitParam = (limit ?? null) as string | null;
            offsetParam = (offset ?? null) as string | null;
        }

        const queryDatabase = new QueryDatabase();
        const filmsRepository = new FilmsRepository(queryDatabase);
        const filmsService = new FilmsService(filmsRepository);

        const response = await filmsService.listFilms(limitParam, offsetParam);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response, null, 2));
    }

}