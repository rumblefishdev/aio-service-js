export const getFromEnv = (env, name, prefix = null, defaultValue = '') => {
  const prefixedName = prefix ? `${prefix}_${name}` : name;
  return env[prefixedName] || defaultValue;
};


const getConfig = (prefix = null) => {
  const queuesPrefix = prefix || process.env.QUEUES_PREFIX;
  return {
    redisUrl: getFromEnv(process.env, 'REDIS_URL', queuesPrefix),
    sentryDSN: getFromEnv(process.env, 'SENTRY_DSN', queuesPrefix),
  };
};

export default getConfig;
