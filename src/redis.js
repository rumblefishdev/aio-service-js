import parse from 'url-parse';
import redis from 'redis';
import genericPool from 'generic-pool';
import Promise from 'bluebird';
import getConfig from './config';


export const parseRedisUrl = (url) => {
  const parsed = parse(url);

  const host = parsed.host.split(':')[0];
  const port = parseInt(parsed.port, 10);

  const user = parsed.username || undefined;
  const password = parsed.password || undefined;
  const db = parseInt(parsed.pathname, 10) || 0;

  return {
    db,
    password,
    host,
    user,
    port,
  };
};


const factory = {
  create: () => {
    Promise.promisifyAll(redis);
    const config = getConfig();
    const options = parseRedisUrl(config.redisUrl);
    return redis.createClient(options);
  },

  destroy: client => client.quit(),
};


const createRedisPool = () => genericPool.createPool(factory, { max: 100 });
export const drainRedisPool = pool => pool.drain().then(() => pool.clear());


export default createRedisPool;
