import { getFromEnv } from './config';

describe('getFromEnv helper', () => {
  it('fetched variable when no prefix', async () => {
    const env = { TEST_VAR: 'test_var_value' };
    const result = getFromEnv(env, 'TEST_VAR');
    expect(result).toEqual('test_var_value');
  });

  it('fetches variable with prefix specified', async () => {
    const env = { PREFIXED_TEST_VAR: 'test_var_value' };
    const result = getFromEnv(env, 'TEST_VAR', 'PREFIXED');
    expect(result).toEqual('test_var_value');
  });

  it('fallsback to default value, if specified', async () => {
    const env = { TEST_VAR: 'test_var_value' };
    const result = getFromEnv(env, 'MISSING_VAR', null, 'default_value');
    expect(result).toEqual('default_value');
  });
});
