import * as React from 'react';

import { ContentComponent, DroppableComponent } from '../';
import { ContentBuilderDraggableComponent } from './';

export interface IContentBuilderComponent {
	id?: string;
	cssClass?: string;
	components: Arctic.Component[];
	onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
	onDragStart: Arctic.DragStartFunc;
	onDragDrop: (event: React.DragEvent<HTMLDivElement>, id: string) => void;
}

export class ContentBuilderComponent extends React.Component<
	IContentBuilderComponent
> {
	public render() {
		const {
			components,
			id,
			onDragOver,
			onDragDrop,
			onDragStart
		} = this.props;
		return (
			<ContentComponent>
				{components.map(
					(
						{ name, type, children }: Arctic.Component,
						componentIndex: number
					) => (
						<ContentBuilderDraggableComponent
							key={`${id}_${componentIndex}`}
							id={`${id}_${componentIndex}`}
							name={name}
							type={type}
							children={children}
							onDragStart={onDragStart}
							onDragOver={onDragOver}
							onDragDrop={onDragDrop}
						/>
					)
				)}
				<DroppableComponent
					name={id}
					onDragOver={ev => onDragOver(ev)}
					onDrop={ev => onDragDrop(ev, id)}
				/>
			</ContentComponent>
		);
	}
}
