import React from 'react';
import classNames from 'classnames';

export type AppProps = React.HTMLAttributes<HTMLDivElement>;

export const App: React.FunctionComponent<AppProps> = ({
  className,
  ...rest
}) => (
  <div className={classNames('center mw7 pa3', className)} {...rest}>
    <h1 className="f2 fw4 mb3 mt0 tc">Hello, World!</h1>
    <p>
      This tests <a href="https://en.wikipedia.org/wiki/HTTP/2">HTTP/2</a>.
    </p>
  </div>
);
