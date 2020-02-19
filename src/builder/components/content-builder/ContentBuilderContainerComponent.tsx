import * as React from 'react';

import { DroppableComponent, Container } from '../';
import { ContentBuilderDraggableComponent } from './';

export interface IContentBuilderContainer {
	id: string;
	children: Arctic.Component[];
	onDragOver: Arctic.DragOverFunc;
	onDragDrop: Arctic.DragDropFunc;
	onDragStart: Arctic.DragStartFunc;
}

export const ContentBuilderContainer = ({
	id,
	children,
	onDragOver,
	onDragStart,
	onDragDrop
}: IContentBuilderContainer) => (
	<Container key={id}>
		{children.map((child: Arctic.Component, index: number) => (
			<ContentBuilderDraggableComponent
				key={`${id}_${index}`}
				id={`${id}_${index}`}
				name={child.name}
				type={child.type}
				children={child.children}
				onDragStart={onDragStart}
				onDragOver={onDragOver}
				onDragDrop={onDragDrop}
			/>
		))}
		<DroppableComponent
			name={id}
			onDragOver={ev => onDragOver(ev)}
			onDrop={ev => onDragDrop(ev, id)}
		/>
	</Container>
);
