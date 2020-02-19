import * as React from 'react';

export interface IGrid {
	children: React.ReactNode;
}

export const Grid = ({ children }: IGrid) => (
	<div className="grid grid-cols-2 gap-4 py-1">{children}</div>
);
