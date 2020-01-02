import React from 'react';
import classNames from 'classnames';

export type AppProps = React.HTMLAttributes<HTMLDivElement>;

export const App: React.FunctionComponent<AppProps> = ({
  className,
  ...rest
}) => (
  <div className={classNames('center mw3 pv3', className)} {...rest}>
    <h1 className="f2 fw4 m0">Hello, World!</h1>
  </div>
);
