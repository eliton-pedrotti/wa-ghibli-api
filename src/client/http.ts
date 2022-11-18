import { ClientRequest, IncomingMessage } from "http";
import { request } from "https";

export class HttpClient {
    public async get(url: string): Promise<string> {
        return await new Promise((resolve, reject) => {
            const req: ClientRequest = request(url, (res: IncomingMessage) => {
                const data: Buffer[] = [];
                res.on("data", chunk => {
                    data.push(chunk);
                });
                res.on("end", () => resolve(Buffer.concat(data).toString()));
            });
            req.end();
        });
    }
}