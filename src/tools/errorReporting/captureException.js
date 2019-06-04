// @flow

import * as Sentry from '@sentry/browser';

type CaptureException = (error: Error) => void;

const captureException: CaptureException = (error) => {
  if (process.env.NODE_ENV === 'development') console.warn(error);
  else Sentry.captureException(error);
};

export default captureException;
