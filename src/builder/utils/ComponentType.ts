export function isComponentType(value: any): value is Arctic.ComponentType {
	return (
		value === 'grid' ||
		value === 'grid_item' ||
		value === 'text' ||
		value === 'card'
	);
}
