import * as React from 'react';
import './draggable-component.scss';
import classNames from 'classnames';

export interface IDraggableComponent {
	name: string;
	id?: string;
	type: string;
	className?: string;
	children?: React.ReactNode;
	draggable?: boolean;
	dropped?: boolean;
	onDragStart: Arctic.DragStartFunc;
}

export const DraggableComponent = ({
	name,
	type,
	id,
	className,
	children,
	onDragStart,
	draggable = true
}: IDraggableComponent) => (
	<div
		className={classNames({ 'draggable': draggable }, className)}
		draggable={draggable}
		onDragStart={ev => draggable && onDragStart(ev, { id, name, type })}
	>
		{type}
		{children}
	</div>
);
