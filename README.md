# aio-service js implementation

Sample usage:
```
import express from 'express';
import Promise from 'bluebird';

import createRouter from './routing';
import queuesApp from './app';
import { createSubscriber, createDispatcher } from './communication';


const TOPICS_TO_SUBSCRIBE = [
  'test.loopback',
  'test',
];

const external = async (pool, appEvent) => {
  const dbEvent = {
    type: appEvent.type,
    payload: {
      id: 'test_id',
    },
  };

  const dispatcher = createDispatcher(pool);
  await dispatcher(dbEvent, ['test.loopback']);
};

const loopback = async (pool, appEvent) => {
  console.log('Loopback for: ', appEvent); // eslint-disable-line
};

const router = createRouter({
  'test:ping': external,
  'test.loopback:ping': loopback,
});

const handler = async (pool, msgRouter = router) => {
  const subscriber = createSubscriber(pool);
  const events = await subscriber(TOPICS_TO_SUBSCRIBE);
  const messages = events.filter(m => m.message !== null);
  if (messages.length > 0) {
    Promise.all(messages.map(m => msgRouter(pool, m)));
  }
};


queuesApp(handler);
const app = express();
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(3000, () => console.log('Example app listening on port 3000!'));
```
