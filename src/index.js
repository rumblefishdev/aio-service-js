import startQueues, { stopQueues, pool } from './app';
import { createDispatcher, createSubscriber } from './communication';
import createRedisPool, { drainRedisPool } from './redis';

export default {
  startQueues,
  stopQueues,
  pool,
  createDispatcher,
  createSubscriber,
  createRedisPool,
  drainRedisPool
};
