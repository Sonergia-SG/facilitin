import * as Sentry from '@sentry/browser';

const captureException = (error) => {
  if (process.env.NODE_ENV === 'development') console.warn(error);
  else Sentry.captureException(error);
};

export default captureException;
