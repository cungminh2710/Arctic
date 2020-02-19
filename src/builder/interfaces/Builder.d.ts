declare namespace Arctic {
	type DragStartFunc = (
		ev: React.DragEvent<HTMLElement>,
		data: { name: string; type: string; id: string }
	) => void;

	type DragOverFunc = (event: React.DragEvent<HTMLElement>) => void;

	type DragDropFunc = (
		event: React.DragEvent<HTMLElement>,
		id: string
	) => void;
}
