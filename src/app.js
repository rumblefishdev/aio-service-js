import Raven from 'raven';
import createRedisPool from './redis';
import { sleep, configureSentry } from './utils';
import { createDispatcher, createSubscriber } from './communication';

let shouldStop = false;

export const pool = createRedisPool();
export function stopQueues() {
  shouldStop = true;
}

async function startQueues(handler, sleepTime = 1) {
  configureSentry();

  process.on('SIGINT', stopQueues);
  process.on('SIGTERM', stopQueues);

  while (!shouldStop) {
    try {
      const dispatcher = createDispatcher(pool);
      const subscriber = createSubscriber(pool);

      await handler({ dispatcher, subscriber });
    } catch (e) {
      Raven.captureException(e);
    } finally {
      await sleep(sleepTime);
    }
  }
}

export default startQueues;
