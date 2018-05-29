import Raven from 'raven';

function defaultRoute(result) {
  throw new Error('Route not found for the given result: ', result);
}

export function resolveKey(result) {
  const { topic, message } = result;
  const eventType = message && message.type ? message.type : 'all';
  return `${topic}:${eventType}`;
}

function createRouter(routes, keyResolver = resolveKey) {
  return async (result, { dispatcher, subscriber }) => {
    const resolver = keyResolver(result);
    const route = routes[resolver] || defaultRoute;
    try {
      await route(result.message, { dispatcher, subscriber });
    } catch (e) {
      Raven.captureException(e);
    }
  };
}

export default createRouter;
