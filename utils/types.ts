export type AlertData = {
	title?: string;
	msg?: string;
	type: string | null;
};

export type Nullish<T> = T | null | undefined;
