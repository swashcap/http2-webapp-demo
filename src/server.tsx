import 'hard-rejection/register';

import React from 'react';
import http2 from 'http2';
import intoStream from 'into-stream';
import mergeStream from 'merge-stream';
import { Readable, Writable } from 'stream';
import { renderToNodeStream } from 'react-dom/server';

import { App } from './app';

const port = process.env.PORT || 3000;

const getTemplateStream = () =>
  mergeStream(
    intoStream(`
  <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title></title>
        <meta name="viewport" content="widget=device-width, initial-scale=1">
      </head>
      <body>
        <div id="app">`),
    renderToNodeStream(<App />) as Readable,
    intoStream(`</div>
      </body>
    </html>`)
  );

export const server = http2.createServer((req, res) => {
  res.writeHead(200, {
    'content-type': 'text/html',
  });
  getTemplateStream().pipe((res as unknown) as Writable);
});

server.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
