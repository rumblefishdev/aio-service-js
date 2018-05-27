import Promise from 'bluebird';
import Raven from 'raven';
import getConfig from './config';


export function sleep(sec) {
  return new Promise(resolve => setTimeout(resolve, sec * 1000));
}


export function configureSentry() {
  const config = getConfig();
  if (config.sentryDSN) {
    Raven.config(config.sentryDSN).install();
  }
}
