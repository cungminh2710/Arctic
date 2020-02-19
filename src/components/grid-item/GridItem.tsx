import * as React from 'react';
import classnames from 'classnames';

export function getMatGridSizeClass(size: number): string {
	return `size-${size}`;
}

export interface IGridItem {
	size: number;
	children: React.ReactNode;
	className?: string;
}

export const GridItem = ({
	size,
	children,
	className
}: IGridItem) => (
	<div className={classnames(getMatGridSizeClass(size), className)}>
		{children}
	</div>
);
