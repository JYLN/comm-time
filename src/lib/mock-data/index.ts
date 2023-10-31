export const customers = [
	{ label: 'Customer 1', value: '1' },
	{ label: 'Customer 2', value: '2' },
	{ label: 'Customer 3', value: '3' },
	{ label: 'Customer 4', value: '4' },
	{ label: 'Customer 5', value: '5' },
	{ label: 'Customer 6', value: '6' },
	{ label: 'Customer 7', value: '7' },
	{ label: 'Customer 8', value: '8' },
	{ label: 'Customer 9', value: '9' }
];

export type Customers = (typeof customers)[number]['value'];
