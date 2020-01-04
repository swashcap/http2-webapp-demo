import { h, hydrate } from 'preact';

import 'tachyons/css/tachyons.css';

import { App } from './app';

const el = document.getElementById('app');

if (el) {
  hydrate(<App />, el);
}
