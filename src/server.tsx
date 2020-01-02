import 'hard-rejection/register';

import React from 'react';
import http from 'http';
import { renderToNodeStream } from 'react-dom/server';

import { App } from './app';

const port = process.env.PORT || 3000;

export const server = http.createServer((req, res) => {
  console.log(req.url);
  res.writeHead(200, {
    'Content-Type': 'text/html',
  });
  res.write('<!doctype html>', () => {
    renderToNodeStream(
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <title>HTTP2 Webapp Demo</title>
          <meta
            name="viewport"
            content="widget=device-width, initial-scale=1"
          />
        </head>
        <body>
          <div id="app">
            <App />
          </div>
        </body>
      </html>
    ).pipe(res);
  });
});

server.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
