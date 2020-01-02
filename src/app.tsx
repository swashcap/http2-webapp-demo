import React from 'react';
import classNames from 'classnames';

export type AppProps = React.HTMLAttributes<HTMLDivElement>;

export const App: React.FunctionComponent<AppProps> = ({
  className,
  ...rest
}) => (
  <div className={classNames('app', className)} {...rest}>
    <h1>Hello, World!</h1>
  </div>
);
