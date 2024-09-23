import { createServer } from 'node:http';
import type { Server } from 'node:http';

// istanbul ignore next
export function runServer(port: number): Promise<Server | undefined> {
  return new Promise<Server | undefined>((resolve, _reject) => {
    const server: Server = createServer(() => {});

    server.listen(port, 'localhost', () => {
      resolve(server);
    });

    server.on('error', () => {
      resolve(undefined);
    });
  });
}
