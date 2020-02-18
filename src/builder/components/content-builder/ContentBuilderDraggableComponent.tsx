import * as React from 'react';
import { DraggableComponent } from '../';
import { ContentBuilderGridComponent } from './';

export interface IContentBuilderDraggableComponent {
	id: string;
	name: string;
	type: string;
	children: Arctic.Component[];
	onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
	onDragStart?: Arctic.DragStartFunc;
	onDragDrop: (event: React.DragEvent<HTMLDivElement>, id: string) => void;
}

export const ContentBuilderDraggableComponent = ({
	id,
	name,
	type,
	children,
	onDragStart,
	onDragOver,
	onDragDrop
}: IContentBuilderDraggableComponent) => {
	if (type === 'grid') {
		return (
			<ContentBuilderGridComponent
				id={id}
				children={children}
				onDragStart={onDragStart}
				onDragOver={onDragOver}
				onDragDrop={onDragDrop}
			/>
		);
	} else {
		return (
			<DraggableComponent
				key={`drag-${id}`}
				id={id}
				className="hoverable"
				name={name}
				type={type}
				onDragStart={onDragStart}
				draggable={true}
				dropped={true}
			/>
		);
	}
};
