# aio-service js implementation

Sample usage:
```
import Promise from 'bluebird';

import createRouter from './routing';
import queuesApp from './app';


const TOPICS_TO_SUBSCRIBE = [
  'test.loopback',
  'test',
];

const external = async (appEvent, { dispatcher }) => {
  const dbEvent = {
    type: appEvent.type,
    payload: {
      id: 'test_id',
    },
  };

  await dispatcher(dbEvent, ['test.loopback']);
};

const loopback = async (appEvent) => {
  console.log('Loopback for: ', appEvent); // eslint-disable-line
};

const router = createRouter({
  'test:ping': external,
  'test.loopback:ping': loopback,
});

const handler = async ({ dispatcher, subscriber }, msgRouter = router) => {
  const events = await subscriber(TOPICS_TO_SUBSCRIBE);
  const messages = events.filter(m => m.message !== null);
  if (messages.length > 0) {
    Promise.all(messages.map(m => msgRouter(m, { dispatcher, subscriber })));
  }
};


queuesApp(handler);
const app = express();
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(3000, () => console.log('Example app listening on port 3000!'));

```
