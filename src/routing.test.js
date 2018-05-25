import { resolveKey } from './routing';


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
