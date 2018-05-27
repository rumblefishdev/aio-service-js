import Raven from 'raven';
import createRouter, { resolveKey } from './routing';


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
  const pool = jest.fn();
  const mockRoute = jest.fn();
  const routes = { 'test:msg': mockRoute };

  Raven.captureException = jest.fn();

  it('routes successfuly when key is resolved', async () => {
    const router = createRouter(routes);
    await router(pool, {
      topic: 'test',
      message: {
        type: 'msg',
        payload: 'payload'
      }
    });
    expect(mockRoute.mock.calls.length).toBe(1);
    expect(mockRoute.mock.calls[0][1]).toEqual({
      type: 'msg',
      payload: 'payload'
    });
  });

  it('captures exception when key is not resolved', async () => {
    const router = createRouter(routes);
    await router(pool, {
      topic: 'unknown_topic',
      message: {
        type: 'msg',
        payload: 'payload'
      }
    });

    const mockCall = Raven.captureException.mock.calls;
    expect(mockCall.length).toEqual(1);
    expect(mockCall[0][0].message).toContain('Route not found for the given result');
  });
});
