import 'hard-rejection/register';

import React from 'react';
import http from 'http';
import { renderToNodeStream } from 'react-dom/server';

import { App } from './app';

const stylesheets: string[] = [];
const scripts: string[] = [];

Object.values<string>(require('../dist/manifest.json')).forEach(entry => {
  if (entry.includes('.css')) {
    stylesheets.push(`/dist/${entry}`);
  } else if (entry.includes('.js')) {
    scripts.push(`/dist/${entry}`);
  }
});

const port = process.env.PORT || 3000;

export const server = http.createServer((req, res) => {
  console.log(req.url);
  res.writeHead(200, {
    'Content-Type': 'text/html',
  });
  res.write('<!doctype html>', () => {
    renderToNodeStream(
      <html className="lh-copy sans-serif" lang="en">
        <head>
          <meta charSet="utf-8" />
          <title>HTTP2 Webapp Demo</title>
          <meta
            name="viewport"
            content="widget=device-width, initial-scale=1"
          />
          {stylesheets.map(href => (
            <link href={href} key={href} rel="stylesheet" />
          ))}
        </head>
        <body>
          <div id="app">
            <App />
          </div>
          {scripts.map(src => (
            <script key={src} src={src}></script>
          ))}
        </body>
      </html>
    ).pipe(res);
  });
});

server.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
