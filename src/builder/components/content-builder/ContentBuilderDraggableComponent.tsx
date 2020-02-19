import * as React from 'react';
import { DraggableComponent } from '../';
import { ContentBuilderGrid, ContentBuilderContainer } from './';

export interface IContentBuilderDraggableComponent {
	id: string;
	name: string;
	type: Arctic.ComponentType;
	children: Arctic.Component[];
	onDragOver: Arctic.DragOverFunc;
	onDragStart?: Arctic.DragStartFunc;
	onDragDrop: Arctic.DragDropFunc;
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
	const dragable = type !== 'container' && type !== 'grid';
	return (
		<div className="component">
			{/* <DroppableComponent
					name={id}
					className="attached"
					onDragOver={ev => onDragOver(ev)}
					onDrop={ev => onDragDrop(ev, id)}
				/> */}
			<DraggableComponent
				key={`drag-${id}`}
				id={id}
				className="hoverable"
				name={name}
				type={type}
				onDragStart={onDragStart}
				draggable={dragable}
				dropped={true}
			>
				{type === 'container' && (
					<ContentBuilderContainer
						id={id}
						children={children}
						onDragStart={onDragStart}
						onDragOver={onDragOver}
						onDragDrop={onDragDrop}
					></ContentBuilderContainer>
				)}
				{type === 'grid' && (
					<ContentBuilderGrid
						id={id}
						children={children}
						onDragStart={onDragStart}
						onDragOver={onDragOver}
						onDragDrop={onDragDrop}
					/>
				)}
			</DraggableComponent>
			{/* <DroppableComponent
					name={id}
					className="attached"
					onDragOver={ev => onDragOver(ev)}
					onDrop={ev => onDragDrop(ev, id)}
				/> */}
		</div>
	);
	// }
};
