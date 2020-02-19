import * as React from 'react';
import classnames from 'classnames';

export interface IContainer {
	className?: string;
	children: React.ReactNode;
}

export const Container = ({
	children,
	className
}: IContainer) => (
	<div className={classnames('container', className)}>{children}</div>
);
