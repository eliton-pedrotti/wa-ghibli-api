import { createServer } from 'http';
import { openConnection } from './database/connection';
import { routes } from './routes';

const host = 'localhost';
const port = 8000;

const server = createServer(routes);

server.listen(port, host, async () => {
    openConnection();
    console.log(`Server is running on http://${host}:${port}`);
});