import 'hard-rejection/register';

import { Readable } from 'stream';
import { h } from 'preact';
import http from 'http';
import render from 'preact-render-to-string';

import { App } from './app';

const linkHeader: string[] = [];
let stylesheets = '';
let scripts = '';

Object.values<string>(require('../dist/manifest.json')).forEach(entry => {
  if (entry.includes('.css')) {
    linkHeader.push(`</dist/${entry}>; as=style; rel=preload`);
    stylesheets += `<link href="/dist/${entry}" rel="stylesheet">`;
  } else if (entry.includes('.js')) {
    linkHeader.push(`</dist/${entry}>; as=script; rel=preload`);
    scripts += `<script src="/dist/${entry}"></script>`;
  }
});

const port = process.env.PORT || 3000;

export const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html',
    // Add a `Link` header, which nginx will use to push assets
    // https://www.nginx.com/blog/nginx-1-13-9-http2-server-push/#automatic-push
    Link: linkHeader,
  });

  Readable.from(
    `${JSON.stringify({
      data: {
        statusCode: 200,
        url: req.url,
      },
      tags: ['info', 'request'],
      time: new Date().toISOString(),
    })}\n`
  ).pipe(process.stdout);

  res.write(
    `<!doctype html>
<html className="lh-copy sans-serif" lang="en">
  <head>
    <meta charSet="utf-8">
    <title>HTTP2 Webapp Demo</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${stylesheets}
  </head>
  <body>`,
    error => {
      if (error) {
        throw error;
      } else {
        res.end(`
    ${render(
      <div id="app">
        <App />
      </div>
    )}
    ${scripts}
  </body>
</html>`);
      }
    }
  );
});

server.listen(port, () => {
  console.log(
    JSON.stringify({
      data: `Server listening at ${port}`,
      tags: ['info', 'server'],
      time: new Date().toISOString(),
    })
  );
});
