import * as http from 'http';
import app from './app';
import Debug from 'debug';
const debug = Debug('store:server');

const port = normalizePort(process.env.PORT || '3000');

const server = http.createServer(app);

server.on('error', onError);
server.on('listening', onListening);
server.listen(port);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string): string | number | false {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

function onError(error: any): void {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(): void {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr?.port;
    debug('Listening on ' + bind);
}