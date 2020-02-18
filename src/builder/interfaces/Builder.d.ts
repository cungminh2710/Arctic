declare namespace Arctic {
	type DragStartFunc = (
		ev: React.DragEvent<HTMLElement>,
		data: { name: string; type: string; id: string }
	) => void;
}
