import * as m from '$lib/paraglide/messages';

export type NodeFunctionInputData = {
	name: string;
	type: 'number' | 'string' | 'boolean' | 'any';
	arrayInput?: true;
};

export type NodeFunctionOutputData = {
	type: 'number' | 'string' | 'boolean' | 'any';
	description?: string;
};

export type NodeFunctionData = {
	id: string;
	names: Array<string>;
	description?: string;
	inputs: Array<NodeFunctionInputData>;
	output: NodeFunctionOutputData;
	function: (...args: Array<string | number | boolean>) => string | number | boolean;
};

export const nodeFunctionData: Array<NodeFunctionData> = [
	{
		id: 'gabriel',
		names: ['GABRIEL'],
		description: 'Always returns what you need the most... or least. Müsst ihr wissen.',
		inputs: [
			{
				type: 'any',
				name: 'input',
				arrayInput: true
			}
		],
		output: { type: 'string' },
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		function: (...inputs) => 'popo'
	},
	// Arithmetic
	{
		id: 'summation',
		names: ['+', m.fn_sum()],
		description: 'Calculates the sum of all input numbers.',
		inputs: [{ name: 'summand', type: 'number', arrayInput: true }],
		output: { type: 'number', description: 'The sum of input numbers' },
		function: (...summands) => {
			if (!summands.every((s) => typeof s === 'number')) {
				throw new Error('Should only pass numbers to this function.');
			}
			return summands.reduce((a, b) => a + b, 0);
		}
	},
	{
		id: 'subtraction',
		names: ['-'],
		description: 'Subtracts the second number from the first.',
		inputs: [
			{ name: 'minuend', type: 'number' },
			{ name: 'subtrahend', type: 'number' }
		],
		output: { type: 'number', description: 'The difference of the input numbers' },
		function: (a, b) => {
			if (typeof a !== 'number' || typeof b !== 'number') {
				throw new Error('Should only pass numbers to this function.');
			}
			return a - b;
		}
	},
	{
		id: 'multiplication',
		names: ['*', m.fn_product()],
		description: 'Calculates the product of input numbers.',
		inputs: [{ name: 'factor', type: 'number', arrayInput: true }],
		output: { type: 'number', description: 'The product of input numbers' },
		function: (...factors) => {
			if (!factors.every((f) => typeof f === 'number')) {
				throw new Error('Should only pass numbers to this function.');
			}
			return factors.reduce((a, b) => a * b, 1);
		}
	},
	{
		id: 'division',
		names: ['/'],
		description: 'Divides the first number by the second.',
		inputs: [
			{ name: 'dividend', type: 'number' },
			{ name: 'divisor', type: 'number' }
		],
		output: { type: 'number', description: 'The quotient of the input numbers' },
		function: (a, b) => {
			if (typeof a !== 'number' || typeof b !== 'number') {
				throw new Error('Should only pass numbers to this function.');
			}
			if (b === 0) {
				throw new Error('Division by zero.');
			}
			return a / b;
		}
	},
	{
		id: 'identity',
		names: [m.fn_identity()],
		description: 'Returns the input number unchanged.',
		inputs: [{ name: 'value', type: 'number' }],
		output: { type: 'number', description: 'The same as the input number' },
		function: (value) => {
			if (typeof value !== 'number') {
				throw new Error('Should only pass numbers to this function.');
			}
			return value;
		}
	},
	{
		id: 'exponentiation',
		names: ['^', m.fn_power()],
		description: 'Raises the base to the power of the exponent.',
		inputs: [
			{ name: 'base', type: 'number' },
			{ name: 'exponent', type: 'number' }
		],
		output: { type: 'number', description: 'The result of base raised to the power of exponent' },
		function: (base, exponent) => {
			if (typeof base !== 'number' || typeof exponent !== 'number') {
				throw new Error('Should only pass numbers to this function.');
			}
			return Math.pow(base, exponent);
		}
	},
	{
		id: 'square',
		names: [m.fn_square()],
		description: 'Returns the square of a number.',
		inputs: [{ name: 'number', type: 'number' }],
		output: { type: 'number', description: 'The square of the number' },
		function: (number) => {
			if (typeof number !== 'number') {
				throw new Error('Should only pass a number to this function.');
			}
			return number ** 2;
		}
	},
	{
		id: 'sqrt',
		names: [m.fn_sqrt()],
		description: 'Calculates the square root of the input number.',
		inputs: [{ name: 'value', type: 'number' }],
		output: { type: 'number', description: 'The square root of the input number' },
		function: (value) => {
			if (typeof value !== 'number') {
				throw new Error('Should only pass numbers to this function.');
			}
			return Math.sqrt(value);
		}
	},
	{
		id: 'is_even',
		names: [m.fn_is_even()],
		description: 'Checks if a number is even.',
		inputs: [{ name: 'number', type: 'number' }],
		output: { type: 'boolean', description: 'True if the number is even, otherwise false' },
		function: (number) => {
			if (typeof number !== 'number') {
				throw new Error('Should only pass a number to this function.');
			}
			return number % 2 === 0;
		}
	},
	{
		id: 'quotient',
		names: [m.fn_quotient()],
		description: 'Returns the integer division result of two numbers.',
		inputs: [
			{ name: 'numerator', type: 'number' },
			{ name: 'denominator', type: 'number' }
		],
		output: { type: 'number', description: 'The integer result of the division' },
		function: (numerator, denominator) => {
			if (typeof numerator !== 'number' || typeof denominator !== 'number') {
				throw new Error('Should only pass numbers to this function.');
			}
			return Math.floor(numerator / denominator);
		}
	},
	{
		id: 'remainder',
		names: [m.fn_remainder()],
		description: 'Returns the remainder of a division.',
		inputs: [
			{ name: 'numerator', type: 'number' },
			{ name: 'denominator', type: 'number' }
		],
		output: { type: 'number', description: 'The remainder of the division' },
		function: (numerator, denominator) => {
			if (typeof numerator !== 'number' || typeof denominator !== 'number') {
				throw new Error('Should only pass numbers to this function.');
			}
			return numerator % denominator;
		}
	},
	{
		id: 'absolute',
		names: [m.fn_absolute()],
		description: 'Returns the absolute value of a number.',
		inputs: [{ name: 'number', type: 'number' }],
		output: { type: 'number', description: 'The absolute value' },
		function: (number) => {
			if (typeof number !== 'number') {
				throw new Error('Should only pass a number to this function.');
			}
			return Math.abs(number);
		}
	},
	{
		id: 'sign',
		names: [m.fn_sign()],
		description: 'Returns the sign of a number.',
		inputs: [{ name: 'number', type: 'number' }],
		output: { type: 'number', description: 'The sign of the number: -1, 0, or 1' },
		function: (number) => {
			if (typeof number !== 'number') {
				throw new Error('Should only pass a number to this function.');
			}
			return Math.sign(number);
		}
	},
	{
		id: 'round',
		names: [m.fn_round()],
		description: 'Rounds a number to the nearest integer.',
		inputs: [{ name: 'number', type: 'number' }],
		output: { type: 'number', description: 'The rounded number' },
		function: (number) => {
			if (typeof number !== 'number') {
				throw new Error('Should only pass a number to this function.');
			}
			return Math.round(number);
		}
	},
	{
		id: 'round_up',
		names: [m.fn_round_up()],
		description: 'Rounds a number up to the nearest integer.',
		inputs: [{ name: 'number', type: 'number' }],
		output: { type: 'number', description: 'The rounded-up number' },
		function: (number) => {
			if (typeof number !== 'number') {
				throw new Error('Should only pass a number to this function.');
			}
			return Math.ceil(number);
		}
	},
	{
		id: 'round_down',
		names: [m.fn_round_down()],
		description: 'Rounds a number down to the nearest integer.',
		inputs: [{ name: 'number', type: 'number' }],
		output: { type: 'number', description: 'The rounded-down number' },
		function: (number) => {
			if (typeof number !== 'number') {
				throw new Error('Should only pass a number to this function.');
			}
			return Math.floor(number);
		}
	},
	{
		id: 'ceiling',
		names: [m.fn_ceiling()],
		description: 'Rounds a number up to the nearest multiple of a given significance.',
		inputs: [
			{ name: 'number', type: 'number' },
			{ name: 'significance', type: 'number' }
		],
		output: { type: 'number', description: 'The rounded-up number' },
		function: (number, significance) => {
			if (typeof number !== 'number' || typeof significance !== 'number') {
				throw new Error('Should only pass numbers to this function.');
			}
			return significance === 0 ? 0 : Math.ceil(number / significance) * significance;
		}
	},
	// Statistical
	{
		id: 'average',
		names: [m.fn_average()],
		description: 'Calculates the average of input numbers.',
		inputs: [{ name: 'value', type: 'number', arrayInput: true }],
		output: { type: 'number', description: 'The average of input numbers' },
		function: (...values) => {
			if (!values.every((v) => typeof v === 'number')) {
				throw new Error('Should only pass numbers to this function.');
			}
			return values.reduce((a, b) => a + b, 0) / values.length;
		}
	},
	{
		id: 'max',
		names: [m.fn_max()],
		description: 'Returns the maximum of input numbers.',
		inputs: [{ name: 'value', type: 'number', arrayInput: true }],
		output: { type: 'number', description: 'The maximum of input numbers' },
		function: (...values) => {
			if (!values.every((v) => typeof v === 'number')) {
				throw new Error('Should only pass numbers to this function.');
			}
			return Math.max(...values);
		}
	},
	{
		id: 'min',
		names: [m.fn_min()],
		description: 'Returns the minimum of input numbers.',
		inputs: [{ name: 'value', type: 'number', arrayInput: true }],
		output: { type: 'number', description: 'The minimum of input numbers' },
		function: (...values) => {
			if (!values.every((v) => typeof v === 'number')) {
				throw new Error('Should only pass numbers to this function.');
			}
			return Math.min(...values);
		}
	},
	{
		id: 'random',
		names: [m.fn_random()],
		description: 'Generates a random number between 0 and 1.',
		inputs: [],
		output: { type: 'number', description: 'A random number between 0 and 1' },
		function: () => Math.random()
	},
	// Logical
	{
		id: 'equals',
		names: ['='],
		description: 'Checks if two values are equal.',
		inputs: [
			{ name: 'value1', type: 'any' },
			{ name: 'value2', type: 'any' }
		],
		output: { type: 'boolean', description: 'True if the values are equal, otherwise false' },
		function: (value1, value2) => value1 === value2
	},
	{
		id: 'less_than',
		names: ['<'],
		description: 'Checks if the first value is less than the second.',
		inputs: [
			{ name: 'value1', type: 'number' },
			{ name: 'value2', type: 'number' }
		],
		output: { type: 'boolean', description: 'True if the first value is less, otherwise false' },
		function: (value1, value2) => value1 < value2
	},
	{
		id: 'greater_than',
		names: ['>'],
		description: 'Checks if the first value is greater than the second.',
		inputs: [
			{ name: 'value1', type: 'number' },
			{ name: 'value2', type: 'number' }
		],
		output: { type: 'boolean', description: 'True if the first value is greater, otherwise false' },
		function: (value1, value2) => value1 > value2
	},
	{
		id: 'if',
		names: [m.fn_if()],
		description: 'Returns one value if a condition is true, and another if it is false.',
		inputs: [
			{ name: 'condition', type: 'boolean' },
			{ name: 'value_if_true', type: 'any' },
			{ name: 'value_if_false', type: 'any' }
		],
		output: { type: 'any', description: 'Value based on the condition' },
		function: (condition, value_if_true, value_if_false) =>
			condition ? value_if_true : value_if_false
	},
	{
		id: 'and',
		names: [m.fn_and()],
		description: 'Checks if all conditions are true.',
		inputs: [{ name: 'condition', type: 'boolean', arrayInput: true }],
		output: { type: 'boolean', description: 'True if all conditions are true, otherwise false' },
		function: (...conditions) => conditions.every(Boolean)
	},
	{
		id: 'or',
		names: [m.fn_or()],
		description: 'Checks if any condition is true.',
		inputs: [{ name: 'condition', type: 'boolean', arrayInput: true }],
		output: { type: 'boolean', description: 'True if any condition is true, otherwise false' },
		function: (...conditions) => conditions.some(Boolean)
	},
	{
		id: 'not',
		names: [m.fn_not()],
		description: 'Inverts a boolean value.',
		inputs: [{ name: 'value', type: 'boolean' }],
		output: { type: 'boolean', description: 'The opposite of the input value' },
		function: (value) => !value
	},
	// Text
	{
		id: 'concatenate',
		names: [m.fn_concatenate()],
		description: 'Joins multiple strings into one.',
		inputs: [{ name: 'text', type: 'string', arrayInput: true }],
		output: { type: 'string', description: 'The concatenated string' },
		function: (...strings) => strings.join('')
	},
	{
		id: 'length',
		names: [m.fn_length()],
		description: 'Returns the length of a string.',
		inputs: [{ name: 'text', type: 'string' }],
		output: { type: 'number', description: 'The length of the string' },
		function: (text) => {
			if (typeof text !== 'string') {
				throw new Error('Should only pass strings to this function.');
			}
			return text.length;
		}
	},
	{
		id: 'upper_case',
		names: [m.fn_upper_case()],
		description: 'Converts a string to uppercase.',
		inputs: [{ name: 'text', type: 'string' }],
		output: { type: 'string', description: 'The string in uppercase' },
		function: (text) => {
			if (typeof text !== 'string') {
				throw new Error('Should only pass strings to this function.');
			}
			return text.toUpperCase();
		}
	},
	{
		id: 'lower_case',
		names: [m.fn_lower_case()],
		description: 'Converts a string to lowercase.',
		inputs: [{ name: 'text', type: 'string' }],
		output: { type: 'string', description: 'The string in lowercase' },
		function: (text) => {
			if (typeof text !== 'string') {
				throw new Error('Should only pass strings to this function.');
			}
			return text.toLowerCase();
		}
	},
	{
		id: 'substitute',
		names: [m.fn_substitute()],
		description: 'Replaces part of a string with another string.',
		inputs: [
			{ name: 'text', type: 'string' },
			{ name: 'search', type: 'string' },
			{ name: 'substitute', type: 'string' }
		],
		output: { type: 'string', description: 'The modified string' },
		function: (text, search, substitute) => {
			if (
				typeof text !== 'string' ||
				typeof search !== 'string' ||
				typeof substitute !== 'string'
			) {
				throw new Error('Should only pass strings to this function');
			}
			return text.replace(new RegExp(search, 'g'), substitute);
		}
	},
	{
		id: 'find',
		names: [m.fn_find()],
		description: 'Finds the position of a substring in a string.',
		inputs: [
			{ name: 'text', type: 'string' },
			{ name: 'substring', type: 'string' }
		],
		output: { type: 'number', description: 'The position of the substring' },
		function: (text, substring) => {
			if (typeof text !== 'string' || typeof substring !== 'string') {
				throw new Error('Should only pass strings to this function');
			}
			return text.indexOf(substring);
		}
	},
	{
		id: 'mid',
		names: [m.fn_mid()],
		description: 'Extracts a substring from a string.',
		inputs: [
			{ name: 'text', type: 'string' },
			{ name: 'start', type: 'number' },
			{ name: 'end', type: 'number' }
		],
		output: { type: 'string', description: 'The extracted substring' },
		function: (text, start, end) => {
			if (typeof text !== 'string' || typeof start !== 'number' || typeof end !== 'number') {
				throw new Error('Should only pass a string and two numbers to this function.');
			}
			return text.substring(start, end);
		}
	},
	{
		id: 'char_code',
		names: [m.fn_char_code()],
		description: 'Returns the character for a given Unicode code point.',
		inputs: [{ name: 'code', type: 'number' }],
		output: { type: 'string', description: 'The character for the given code point' },
		function: (code) => {
			if (typeof code !== 'number') {
				throw new Error('Should only pass a number to this function.');
			}
			return String.fromCharCode(code);
		}
	},
	{
		id: 'char_code_value',
		names: [m.fn_char_code_value()],
		description: 'Returns the Unicode code point of the first character in the input string.',
		inputs: [{ name: 'char', type: 'string' }],
		output: { type: 'number', description: 'The Unicode code point of the character' },
		function: (char) => {
			if (typeof char !== 'string') {
				throw new Error('Should only pass a string to this function.');
			}
			return char.charCodeAt(0);
		}
	},
	{
		id: 'left',
		names: [m.fn_left()],
		description: 'Extracts a specified number of characters from the beginning of a string.',
		inputs: [
			{ name: 'text', type: 'string' },
			{ name: 'count', type: 'number' }
		],
		output: { type: 'string', description: 'The extracted substring' },
		function: (text, count) => {
			if (typeof text !== 'string' || typeof count !== 'number') {
				throw new Error('Should only pass a string and a number to this function.');
			}
			return text.substring(0, count);
		}
	},
	{
		id: 'right',
		names: [m.fn_right()],
		description: 'Extracts a specified number of characters from the end of a string.',
		inputs: [
			{ name: 'text', type: 'string' },
			{ name: 'count', type: 'number' }
		],
		output: { type: 'string', description: 'The extracted substring' },
		function: (text, count) => {
			if (typeof text !== 'string') {
				throw new Error('Should only pass a string to this function.');
			}
			return text.slice(-count);
		}
	},
	// Date and Time
	{
		id: 'now',
		names: [m.fn_now()],
		description: 'Returns the current date and time.',
		inputs: [],
		output: { type: 'string', description: 'The current date and time as a string' },
		function: () => new Date().toISOString()
	},
	{
		id: 'today',
		names: [m.fn_today()],
		description: 'Returns the current date.',
		inputs: [],
		output: { type: 'string', description: 'The current date as a string' },
		function: () => new Date().toISOString().split('T')[0]
	},
	{
		id: 'year',
		names: [m.fn_year()],
		description: 'Returns the year from a given date.',
		inputs: [{ name: 'date', type: 'string' }],
		output: { type: 'number', description: 'The year of the input date' },
		function: (date) => {
			if (typeof date !== 'string' && typeof date !== 'number') {
				throw new Error('Should only pass a string or number to this function.');
			}
			const parsedDate = new Date(date);
			if (isNaN(parsedDate.getTime())) {
				throw new Error('Invalid date string.');
			}
			return parsedDate.getFullYear();
		}
	},
	{
		id: 'weekday',
		names: [m.fn_weekday()],
		description: 'Returns the day of the week from a given date.',
		inputs: [{ name: 'date', type: 'string' }],
		output: { type: 'number', description: 'The weekday (1 for Sunday, 7 for Saturday)' },
		function: (date) => {
			if (typeof date !== 'string' && typeof date !== 'number') {
				throw new Error('Should only pass a string or number to this function.');
			}
			const parsedDate = new Date(date);
			if (isNaN(parsedDate.getTime())) {
				throw new Error('Invalid date string.');
			}
			return new Date(date).getDay() + 1;
		}
	},
	{
		id: 'month',
		names: [m.fn_month()],
		description: 'Returns the month from a given date.',
		inputs: [{ name: 'date', type: 'string' }],
		output: { type: 'number', description: 'The month as a number (1-12)' },
		function: (date) => {
			if (typeof date !== 'string' && typeof date !== 'number') {
				throw new Error('Should only pass a string or number to this function.');
			}
			const parsedDate = new Date(date);
			if (isNaN(parsedDate.getTime())) {
				throw new Error('Invalid date string.');
			}
			return new Date(date).getMonth() + 1;
		}
	},
	{
		id: 'hour',
		names: [m.fn_hour()],
		description: 'Returns the hour from a given time.',
		inputs: [{ name: 'time', type: 'string' }],
		output: { type: 'number', description: 'The hour (0-23)' },
		function: (time) => {
			if (typeof time !== 'string' && typeof time !== 'number') {
				throw new Error('Should only pass a string or number to this function.');
			}
			const parsedDate = new Date(time);
			if (isNaN(parsedDate.getTime())) {
				throw new Error('Invalid time string.');
			}
			return new Date(time).getHours() + 1;
		}
	},
	{
		id: 'minute',
		names: [m.fn_minute()],
		description: 'Returns the minute from a given time.',
		inputs: [{ name: 'time', type: 'string' }],
		output: { type: 'number', description: 'The minute (0-59)' },
		function: (time) => {
			if (typeof time !== 'string' && typeof time !== 'number') {
				throw new Error('Should only pass a string or number to this function.');
			}
			const parsedDate = new Date(time);
			if (isNaN(parsedDate.getTime())) {
				throw new Error('Invalid time string.');
			}
			return new Date(time).getMinutes() + 1;
		}
	},
	{
		id: 'second',
		names: [m.fn_second()],
		description: 'Returns the second from a given time.',
		inputs: [{ name: 'time', type: 'string' }],
		output: { type: 'number', description: 'The second (0-59)' },
		function: (time) => {
			if (typeof time !== 'string' && typeof time !== 'number') {
				throw new Error('Should only pass a string or number to this function.');
			}
			const parsedDate = new Date(time);
			if (isNaN(parsedDate.getTime())) {
				throw new Error('Invalid time string.');
			}
			return new Date(time).getSeconds() + 1;
		}
	},
	{
		id: 'date',
		names: [m.fn_date()],
		description: 'Creates a date from year, month, and day.',
		inputs: [
			{ name: 'year', type: 'number' },
			{ name: 'month', type: 'number' },
			{ name: 'day', type: 'number' }
		],
		output: { type: 'string', description: 'The resulting date in ISO format' },
		function: (year, month, day) => {
			if (typeof year !== 'number' || typeof month !== 'number' || typeof day !== 'number') {
				throw new Error('Should only pass a string or number to this function.');
			}
			return new Date(year, month - 1, day).toISOString().split('T')[0];
		}
	},
	{
		id: 'time',
		names: [m.fn_time()],
		description: 'Creates a time from hours, minutes, and seconds.',
		inputs: [
			{ name: 'hours', type: 'number' },
			{ name: 'minutes', type: 'number' },
			{ name: 'seconds', type: 'number' }
		],
		output: { type: 'string', description: 'The resulting time in HH:mm:ss format' },
		function: (hours, minutes, seconds) => {
			if (typeof hours !== 'number' || typeof minutes !== 'number' || typeof seconds !== 'number') {
				throw new Error('Should only pass a string or number to this function.');
			}
			return new Date(0, 0, 0, hours, minutes, seconds).toTimeString().split(' ')[0];
		}
	},
	{
		id: 'count',
		names: [m.fn_count()],
		description: 'Counts the number of numeric values in the input.',
		inputs: [{ name: 'values', type: 'number', arrayInput: true }],
		output: { type: 'number', description: 'The count of numeric values' },
		function: (...values) => {
			if (!Array.isArray(values)) {
				throw new Error('Input must be an array of values.');
			}
			return values.filter((value) => typeof value === 'number').length;
		}
	}
];

export const nodeFunctionCategories = [
	{
		id: 'arithmetic',
		name: m.fn_category_arithmetic(),
		functionIds: [
			'summation',
			'subtraction',
			'multiplication',
			'division',
			'identity',
			'exponentiation',
			'square',
			'sqrt',
			'is_even',
			'quotient',
			'remainder',
			'absolute',
			'sign',
			'round',
			'round_up',
			'round_down',
			'ceiling'
		]
	},
	{
		id: 'statistical',
		name: m.fn_category_statistics(),
		functionIds: ['average', 'max', 'min', 'random']
	},
	{
		id: 'logical',
		name: m.fn_category_logic(),
		functionIds: ['equals', 'less_than', 'greater_than', 'if', 'and', 'or', 'not']
	},
	{
		id: 'text',
		name: m.fn_category_text(),
		functionIds: [
			'concatenate',
			'length',
			'upper_case',
			'lower_case',
			'substitute',
			'find',
			'mid',
			'char_code',
			'char_code_value',
			'left',
			'right'
		]
	},
	{
		id: 'time',
		name: m.fn_category_time(),
		functionIds: [
			'now',
			'today',
			'year',
			'weekday',
			'month',
			'hour',
			'minute',
			'second',
			'date',
			'time'
		]
	},
	{
		id: 'misc',
		name: m.fn_category_misc(),
		functionIds: ['count', 'gabriel']
	}
];
