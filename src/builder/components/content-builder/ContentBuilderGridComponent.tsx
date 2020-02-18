import * as React from 'react';

import { DroppableComponent, GridComponent, GridItemComponent } from '../';
import { ContentBuilderDraggableComponent } from './';

export interface IContentBuilderGridComponent {
	id: string;
	children: Arctic.Component[];
	onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
	onDragDrop: (event: React.DragEvent<HTMLDivElement>, id: string) => void;
}

export const ContentBuilderGridComponent = ({
	id,
	children,
	onDragOver,
	onDragDrop
}: IContentBuilderGridComponent) => (
	<GridComponent key={id}>
		{children.map(
			(
				{ children: gridItemChildren, renderProps }: Arctic.Component,
				gridItemIndex: number
			) => {
				const gridId = `${id}_${gridItemIndex}`;
				return (
					<GridItemComponent key={gridId} size={renderProps.size}>
						{gridItemChildren.map(
							(child: Arctic.Component, index: number) => (
								<ContentBuilderDraggableComponent
									key={`${gridId}_${index}`}
									id={`${gridId}_${index}`}
									name={child.name}
									type={child.type}
									children={child.children}
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
					</GridItemComponent>
				);
			}
		)}
	</GridComponent>
);
