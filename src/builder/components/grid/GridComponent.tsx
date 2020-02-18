import * as React from 'react';

export interface IGridComponent {
	children: React.ReactNode;
}

export const GridComponent = ({ children }: IGridComponent) => (
	<div className="grid grid-cols-2 gap-4 py-1">{children}</div>
);
