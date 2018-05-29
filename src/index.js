import startQueues, { stopQueues, pool } from './app';
import { createDispatcher, createSubscriber } from './communication';
import createRedisPool, { drainRedisPool } from './redis';
import createRouter from './routing';

export default {
  startQueues,
  stopQueues,
  createRouter,
  pool,
  createDispatcher,
  createSubscriber,
  createRedisPool,
  drainRedisPool
};
