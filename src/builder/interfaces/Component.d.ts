declare namespace Arctic {
	export interface Component {
		name: string;
		type: ComponentType;
		renderProps?: {
			size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
		};
		children?: Component[];
	}
}
