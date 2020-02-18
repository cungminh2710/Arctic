declare namespace Arctic {
	type DragFunc = (
		ev: React.DragEvent<HTMLElement>,
		data: { name: string; type: string; id: string }
	) => void;
}
