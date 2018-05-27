import Raven from 'raven';
import createRedisPool, { drainRedisPool } from './redis';
import { sleep, configureSentry } from './utils';


async function queuesApp(handler, sleepTime = 1) {
  let shouldStop = false;
  const pool = createRedisPool();
  configureSentry();

  const scheduleStop = async () => {
    await drainRedisPool(pool);
    shouldStop = true;
  };

  process.on('SIGTERM', async () => await scheduleStop);
  process.on('SIGINT', async () => await scheduleStop);

  while (!shouldStop) {
    try {
      await handler(pool);
    } catch (e) {
      Raven.captureException(e);
    } finally {
      await sleep(sleepTime);
    }
  }
}


export default queuesApp;
