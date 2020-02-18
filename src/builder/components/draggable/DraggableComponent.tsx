import * as React from 'react';
import './draggable-component.scss';
import classNames from 'classnames';

export interface IDraggableComponent {
	name: string;
	id?: string;
	type: string;
	className?: string;
	draggable?: boolean;
	dropped?: boolean;
	onDragStart: Arctic.DragStartFunc;
}

export const DraggableComponent = ({
	name,
	type,
	id,
	className,
	onDragStart,
	draggable = true
}: IDraggableComponent) => (
	<div
		className={classNames('draggable-component', className)}
		draggable={draggable}
		onDragStart={ev => onDragStart(ev, { id, name, type })}
	>
		{name}
	</div>
);
