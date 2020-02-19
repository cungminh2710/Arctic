import { fromJS } from 'immutable';
import * as React from 'react';

import './builder-layout.scss';

import { ContentBuilderComponent, DraggableComponent } from './components';
import { DraggableComponents } from './draggable-components';
import { isComponentType } from './utils/ComponentType';

export interface BuilderState {
	dashboardState: Arctic.Component[];
	isDragging: boolean;
}

const INT_LENGTH = 5;

const originalState: Arctic.Component[] = [
	{
		name: 'Blank',
		type: 'container',
		children: []
	}
];

export class BuilderLayout extends React.Component {
	public state: BuilderState = {
		dashboardState: originalState,
		isDragging: false
	};

	constructor(props: {}) {
		super(props);

		this.onDragStart = this.onDragStart.bind(this);
		this.onDragDrop = this.onDragDrop.bind(this);
	}

	public render() {
		const { dashboardState } = this.state;
		return (
			<div className="builder">
				<div className="builder-draggables">
					{DraggableComponents.map(
						({ name, type }: Arctic.Component, index: number) => (
							<DraggableComponent
								key={`comp-${index}`}
								name={name}
								type={type}
								onDragStart={this.onDragStart}
								dropped={false}
							/>
						)
					)}
				</div>
				<div className="builder-droppables">
					{dashboardState.map(
						(
							{ children: contentComponents }: Arctic.Component,
							index: number
						) => (
							<ContentBuilderComponent
								key={`cb_${index}`}
								id={`cb_${index}`}
								components={contentComponents}
								onDragStart={this.onDragStart}
								onDragDrop={this.onDragDrop}
								onDragOver={(
									ev: React.DragEvent<HTMLDivElement>
								) => this.onDragOver(ev)}
							/>
						)
					)}
				</div>
			</div>
		);
	}

	private onDragStart: Arctic.DragStartFunc = (event, data) => {
		event.dataTransfer.setData('id', data.id);
		event.dataTransfer.setData('name', data.name);
		event.dataTransfer.setData('type', data.type);
	};

	private onDragOver(event: React.DragEvent<HTMLDivElement>) {
		event.preventDefault();
	}

	private getComponentPath(id: string, getRoot: boolean = false) {
		const containerArray: string[] = id.split('_');
		containerArray.shift(); // ignore first param, it is string prefix
		getRoot && containerArray.pop();
		const componentsPath: Array<number | string> = [];
		containerArray.forEach((id: string) => {
			componentsPath.push(parseInt(id, INT_LENGTH));
			componentsPath.push('children');
		});

		return componentsPath;
	}

	/**
	 * Handles drop into droppable component and updates application state
	 * Create new component based on draggable name and type
	 * Create an array of indexes to determine position in state
	 * Loop through array of indexes and build out path to update
	 * Create ImmutableJS object and update path with new component
	 * Save state
	 * @param event
	 * @param containerId
	 */
	private onDragDrop(
		event: React.DragEvent<HTMLDivElement>,
		containerId: string
	) {
		const name = event.dataTransfer.getData('name');
		const type = event.dataTransfer.getData('type');
		const id = event.dataTransfer.getData('id');
		console.log(name, type, id);
		if (isComponentType(type)) {
			const { dashboardState } = this.state;
			let componentState = fromJS(dashboardState);
			let componentPath: Array<number | string>;

			const newComponent: Arctic.Component = this.generateComponent(
				id === 'undefined'
					? type.toUpperCase() + '-' + Date.now()
					: name,
				type
			);
			componentPath = this.getComponentPath(containerId);
			console.log(
				`Updating: ${componentPath} in `,
				componentState.toJS()
			);
			componentState = componentState.updateIn(
				componentPath,
				(list: any) => list.push(newComponent)
			);
			// If moving component between containers
			if (id !== 'undefined') {
				componentPath = this.getComponentPath(id, true);
				console.log(
					`Removing: ${componentPath}-${id}/${name} in `,
					componentState.toJS()
				);
				componentState = componentState.updateIn(
					componentPath,
					(list: any) =>
						list.filter(
							(component: any) => component.get('name') !== name
						)
				);
			}
			console.log(componentState.toJS());
			this.setState({ dashboardState: componentState.toJS() });
		}
	}

	private generateComponent(
		name: string,
		type: Arctic.ComponentType
	): Arctic.Component {
		let newComponent: Arctic.Component = {
			name,
			type
		};
		if (type === 'grid') {
			// TODO - predefine this somewhere else (default props)
			const gridItem: Arctic.Component = {
				children: [],
				name,
				renderProps: {
					size: 6 // <- make this configurable
				},
				type: 'grid_item'
			};
			newComponent = {
				...newComponent,
				children: [gridItem, gridItem] // <- make this configurable
			};
		} else if (type === 'container') {
			newComponent = { ...newComponent, children: [] };
		}
		return newComponent;
	}
}
