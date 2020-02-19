import * as React from 'react';
import classnames from 'classnames';
import './droppable-component.scss';

export interface IDroppableComponent {
	name: string;
	className?: string;
	onDragOver: Arctic.DragOverFunc;
	onDrop: Arctic.DragDropFunc;
	children?: React.ReactNode;
}

export const DroppableComponent = ({
	name,
	className,
	onDragOver,
	onDrop,
	children
}: IDroppableComponent) => (
	<div
		className={classnames("droppable", className)}
		onDragOver={(ev: React.DragEvent<HTMLDivElement>) => onDragOver(ev)}
		onDrop={(ev: React.DragEvent<HTMLDivElement>) => onDrop(ev, name)}
		data-id={name}
	>
		<span>Drop components here!</span>
		{children}
	</div>
);
