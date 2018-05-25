import Promise from 'bluebird';
import createRedisPool from './redis';

function sleep(sec) {
  return new Promise(resolve => setTimeout(resolve, sec * 1000));
}


async function queuesApp(handler, sleepTime = 1) {
  const pool = createRedisPool();
  while (true) {
    try {
      await handler(pool);
    } catch (e) {
      console.log(e);  //eslint-disable-line
    } finally {
      await sleep(sleepTime);
    }
  }
}


export default queuesApp;
