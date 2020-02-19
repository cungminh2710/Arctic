import * as React from 'react';
import './content-component.scss';

export interface IContentComponent {
	children: React.ReactNode;
	className?: string;
}

export const ContentComponent = ({ children }: IContentComponent) => (
	<div className="content">{children}</div>
);
