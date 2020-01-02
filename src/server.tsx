import 'hard-rejection/register';

import Multistream from 'multistream';
import React from 'react';
import http from 'http';
import intoStream from 'into-stream';
import { Readable, PassThrough } from 'stream';
import { renderToNodeStream } from 'react-dom/server';

import { App } from './app';

const stylesheets: string[] = [];
const scripts: string[] = [];
const linkHeader: string[] = [];

Object.values<string>(require('../dist/manifest.json')).forEach(entry => {
  if (entry.includes('.css')) {
    linkHeader.push(`</dist/${entry}>; as=style; rel=preload`);
    stylesheets.push(`/dist/${entry}`);
  } else if (entry.includes('.js')) {
    linkHeader.push(`</dist/${entry}>; as=script; rel=preload`);
    scripts.push(`/dist/${entry}`);
  }
});

const port = process.env.PORT || 3000;

export const server = http.createServer((req, res) => {
  console.log(req.url);

  res.writeHead(200, {
    'Content-Type': 'text/html',
    // Add a `Link` header, which nginx will use to push assets
    // https://www.nginx.com/blog/nginx-1-13-9-http2-server-push/#automatic-push
    Link: linkHeader,
  });

  const pass = new PassThrough();

  new Multistream([
    intoStream(`<!doctype html>
<html className="lh-copy sans-serif" lang="en">
  <head>
    <meta charSet="utf-8">
    <title>HTTP2 Webapp Demo</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${stylesheets
      .map(href => `<link href="${href}" rel="stylesheet">`)
      .join('')}
  </head>
  <body>`),
    renderToNodeStream(
      <div id="app">
        <App />
      </div>
    ),
    intoStream(`
    ${scripts.map(src => `<script src="${src}"></script>`).join('')}
  </body>
</html>`),
  ]).pipe(pass);

  pass.pipe(res);
});

server.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
