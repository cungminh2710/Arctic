import * as React from 'react';

import { DroppableComponent, Grid, GridItem } from '../';
import { ContentBuilderDraggableComponent } from './';

export interface IContentBuilderGrid {
	id: string;
	children: Arctic.Component[];
	onDragOver: Arctic.DragOverFunc;
	onDragDrop: Arctic.DragDropFunc;
	onDragStart: Arctic.DragStartFunc;
}

export const ContentBuilderGrid = ({
	id,
	children,
	onDragOver,
	onDragStart,
	onDragDrop
}: IContentBuilderGrid) => (
	<Grid key={id}>
		{children.map(
			(
				{ children: gridItemChildren, renderProps }: Arctic.Component,
				gridItemIndex: number
			) => {
				const gridId = `${id}_${gridItemIndex}`;
				return (
					<GridItem key={gridId} size={renderProps.size}>
						{gridItemChildren.map(
							(child: Arctic.Component, index: number) => (
								<ContentBuilderDraggableComponent
									key={`${gridId}_${index}`}
									id={`${gridId}_${index}`}
									name={child.name}
									type={child.type}
									children={child.children}
									onDragStart={onDragStart}
									onDragOver={onDragOver}
									onDragDrop={onDragDrop}
								/>
							)
						)}
						<DroppableComponent
							name={gridId}
							onDragOver={ev => onDragOver(ev)}
							onDrop={ev => onDragDrop(ev, gridId)}
						/>
					</GridItem>
				);
			}
		)}
	</Grid>
);
