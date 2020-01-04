import { FunctionComponent, JSX, h } from 'preact';
import classNames from 'classnames';

export type AppProps = JSX.HTMLAttributes<HTMLDivElement>;

export const App: FunctionComponent<AppProps> = ({ className, ...rest }) => (
  <div className={classNames('center mw7 pa3', className)} {...rest}>
    <h1 className="f2 fw4 mb3 mt0 tc">Hello, World!</h1>
    <p>
      This tests{' '}
      <a className="color-inherit" href="https://en.wikipedia.org/wiki/HTTP/2">
        HTTP/2
      </a>{' '}
      using a Node.js server and{' '}
      <a
        className="color-inherit"
        href="https://www.nginx.com/blog/nginx-1-13-9-http2-server-push/#automatic-push"
      >
        nginx's server push
      </a>
      .
    </p>
  </div>
);
