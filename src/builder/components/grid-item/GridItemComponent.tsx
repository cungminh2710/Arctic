import * as React from 'react';

export function getMatGridSizeClass(size: number): string {
	return `size-${size}`;
}

export interface IGridItemComponent {
	size: number;
	children: React.ReactNode;
	cssClass?: string;
}

export const GridItemComponent = ({
	size,
	children,
	cssClass = ''
}: IGridItemComponent) => (
	<div
		className={`${getMatGridSizeClass(size)}${
			cssClass !== '' ? ` ${cssClass}` : ''
		}`}
	>
		{children}
	</div>
);
