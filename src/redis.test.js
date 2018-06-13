import createRedisPool, { parseRedisUrl } from './redis';

describe('parseRedisUrl', () => {
  const baseResult = {
    port: 6379,
    host: 'redis-tests',
    db: 1,
  };

  it('parses the url', async () => {
    const url = 'redis://redis-tests:6379/1';
    const result = parseRedisUrl(url);

    const expected = { ...baseResult, user: undefined, password: undefined };
    expect(result).toEqual(expected);
  });

  it('parses the url with credentials', async () => {
    const url = 'redis://user:pass@redis-tests:6379/1';
    const result = parseRedisUrl(url);

    const expected = { ...baseResult, user: 'user', password: 'pass' };
    expect(result).toEqual(expected);
  });
});

describe('redis connection pool', () => {
  it('creates the redis pool', async () => {
    const pool = createRedisPool();
    expect(pool).not.toBeNull();
  });
});
