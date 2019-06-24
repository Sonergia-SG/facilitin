import * as Sentry from '@sentry/browser';

const localDev = process.env.NODE_ENV === 'development';

Sentry.init({
  dsn: localDev ? undefined : 'https://ff35055fa6c74fc496256c9346ff9edb@sentry.io/1472309',
  debug: localDev,
  environment: process.env.NODE_ENV,
});
