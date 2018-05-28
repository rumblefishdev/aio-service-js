import Raven from 'raven';
import createRouter, { resolveKey } from './routing';
import { createDispatcher, createSubscriber } from './communication';
import createRedisPool from './redis';


describe('resolving key', () => {
  it('resolves the key based on message type', () => {
    const message = {
      topic: 'test_topic',
      message: {
        type: 'msg_type',
        payload: {}
      }
    };

    const key = resolveKey(message);

    expect(key).toBe('test_topic:msg_type');
  });

  it('resolves the key to default', () => {
    const message = {
      topic: 'test_topic',
      message: {
        payload: {}
      }
    };

    const key = resolveKey(message);

    expect(key).toBe('test_topic:all');
  });
});

describe('createRouter', async () => {
  const pool = createRedisPool();
  const mockRoute = jest.fn();
  const routes = { 'test:msg': mockRoute };
  const queuesMethods = {
    dispatcher: createDispatcher(pool),
    subscriber: createSubscriber(pool)
  };

  Raven.captureException = jest.fn();

  it('routes successfuly when key is resolved', async () => {
    const router = createRouter(routes);
    await router({
      topic: 'test',
      message: {
        type: 'msg',
        payload: 'payload'
      }
    }, queuesMethods);
    expect(mockRoute.mock.calls.length).toBe(1);
    expect(mockRoute.mock.calls[0][0]).toEqual({
      type: 'msg',
      payload: 'payload'
    });
  });

  it('captures exception when key is not resolved', async () => {
    const router = createRouter(routes);
    await router({
      topic: 'unknown_topic',
      message: {
        type: 'msg',
        payload: 'payload'
      }
    }, queuesMethods);

    const mockCall = Raven.captureException.mock.calls;
    expect(mockCall.length).toEqual(1);
    expect(mockCall[0][0].message).toContain('Route not found for the given result');
  });
});
