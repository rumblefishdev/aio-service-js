import Promise from 'bluebird';


export const createDispatcher = pool => (msg, topics = []) => {
  const jsonMsg = JSON.stringify(msg);
  return Promise.all(
    topics.map(
      async (topic) => {
        const conn = await pool.acquire();
        await conn.rpushAsync(topic, jsonMsg);
        await pool.release(conn);
      }
    )
  );
};

export const createSubscriber = pool => (topics = []) => Promise.all(
  topics.map(
    async (topic) => {
      const conn = await pool.acquire();
      const result = await conn.lpopAsync(topic);
      await pool.release(conn);
      return {
        topic,
        message: JSON.parse(result),
      };
    }
  )
);

