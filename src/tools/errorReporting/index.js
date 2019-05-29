import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: 'https://6d128336cbe347aa8be18f00d28df9e8@sentry.io/1470574',
  debug: process.env.NODE_ENV === 'development',
  environment: process.env.NODE_ENV,
});
