import { detect } from 'detect-browser';

const browser = detect();

export const name = () => browser.name;

export const isMicrosoftBrowser = () => name() !== 'edge' && name() !== 'ie';
