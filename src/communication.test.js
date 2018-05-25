import { createDispatcher, createSubscriber } from './communication';
import createRedisPool from './redis';

describe('communication', () => {
  it('dispatches and subscribes to topics as expected', async () => {
    const pool = createRedisPool();
    const dispatcher = await createDispatcher(pool);
    const subscriber = await createSubscriber(pool);

    const topic = ['test_topic'];
    const msg = { test: 'msg' };

    await dispatcher(msg, topic);
    const result = await subscriber(topic);

    const expected = [{ message: { test: 'msg' }, topic: 'test_topic' }];
    expect(result).toEqual(expected);
  });
});
