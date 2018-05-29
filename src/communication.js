import Promise from 'bluebird';


const withConnection = async (pool, operation) => {
  const conn = await pool.acquire();
  try {
    return await operation(conn);
  } finally {
    await pool.release(conn);
  }
};


export const createDispatcher = pool => (msg, topics = []) => {
  const jsonMsg = JSON.stringify(msg);
  return Promise.all(
    topics.map(
      async topic => await withConnection(pool, conn => conn.rpushAsync(topic, jsonMsg))
    )
  );
};

export const createSubscriber = pool => (topics = []) => Promise.all(
  topics.map(
    async (topic) => {
      const result = await withConnection(pool, conn => conn.lpopAsync(topic));
      return {
        topic,
        message: JSON.parse(result),
      };
    }
  )
);
