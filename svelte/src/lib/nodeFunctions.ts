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
		description: 'Always returns what you need the most... or least, müsst ihr wissen.',
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
		names: ['+', 'SUM', 'SUMME'],
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
		names: ['-', 'SUBTRACTION'],
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
		names: ['*', 'PRODUCT', 'PRODUKT'],
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
		names: ['/', 'DIVISION'],
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
		names: ['IDENTITY'],
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
		names: ['^', 'POWER', 'POTENZ'],
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
		names: ['SQUARE', 'QUADRIEREN'],
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
		names: ['SQRT', 'WURZEL'],
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
		names: ['IS_EVEN', 'ISTGERADE'],
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
		names: ['QUOTIENT'],
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
		names: ['REMAINDER', 'REST', 'MODULO', '%'],
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
		names: ['ABS'],
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
		names: ['SIGN', 'VORZEICHEN'],
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
		names: ['ROUND', 'RUNDEN'],
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
		names: ['ROUNDUP', 'AUFRUNDEN'],
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
		names: ['ROUNDDOWN', 'ABRUNDEN'],
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
		names: ['CEILING', 'OBERGRENZE'],
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
		names: ['AVERAGE', 'MITTELWERT'],
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
		names: ['MAX'],
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
		names: ['MIN'],
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
		names: ['RANDOM', 'ZUFALLSZAHL'],
		description: 'Generates a random number between 0 and 1.',
		inputs: [],
		output: { type: 'number', description: 'A random number between 0 and 1' },
		function: () => Math.random()
	},
	// Logical
	{
		id: 'equals',
		names: ['=', 'EQUALS'],
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
		names: ['<', 'LESS_THAN'],
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
		names: ['>', 'GREATER_THAN'],
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
		names: ['IF', 'WENN'],
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
		names: ['AND', 'UND'],
		description: 'Checks if all conditions are true.',
		inputs: [{ name: 'condition', type: 'boolean', arrayInput: true }],
		output: { type: 'boolean', description: 'True if all conditions are true, otherwise false' },
		function: (...conditions) => conditions.every(Boolean)
	},
	{
		id: 'or',
		names: ['OR', 'ODER'],
		description: 'Checks if any condition is true.',
		inputs: [{ name: 'condition', type: 'boolean', arrayInput: true }],
		output: { type: 'boolean', description: 'True if any condition is true, otherwise false' },
		function: (...conditions) => conditions.some(Boolean)
	},
	{
		id: 'not',
		names: ['NOT', 'NICHT'],
		description: 'Inverts a boolean value.',
		inputs: [{ name: 'value', type: 'boolean' }],
		output: { type: 'boolean', description: 'The opposite of the input value' },
		function: (value) => !value
	},
	// Text
	{
		id: 'concatenate',
		names: ['CONCATENATE', 'VERKETTEN'],
		description: 'Joins multiple strings into one.',
		inputs: [{ name: 'text', type: 'string', arrayInput: true }],
		output: { type: 'string', description: 'The concatenated string' },
		function: (...strings) => strings.join('')
	},
	{
		id: 'length',
		names: ['LENGTH', 'LÄNGE'],
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
		names: ['UPPER', 'GROSS'],
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
		names: ['LOWER', 'KLEIN'],
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
		id: 'replace',
		names: ['REPLACE', 'WECHSELN'],
		description: 'Replaces part of a string with another string.',
		inputs: [
			{ name: 'text', type: 'string' },
			{ name: 'search', type: 'string' },
			{ name: 'replace', type: 'string' }
		],
		output: { type: 'string', description: 'The modified string' },
		function: (text, search, replace) => {
			if (typeof text !== 'string' || typeof search !== 'string' || typeof replace !== 'string') {
				throw new Error('Should only pass strings to this function');
			}
			return text.replace(new RegExp(search, 'g'), replace);
		}
	},
	{
		id: 'find',
		names: ['FIND', 'FINDEN'],
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
		names: ['MID', 'TEIL'],
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
		names: ['CHAR', 'ZEICHEN'],
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
		names: ['CODE'],
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
		names: ['LEFT', 'LINKS'],
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
		names: ['RIGHT', 'RECHTS'],
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
		names: ['NOW', 'JETZT'],
		description: 'Returns the current date and time.',
		inputs: [],
		output: { type: 'string', description: 'The current date and time as a string' },
		function: () => new Date().toISOString()
	},
	{
		id: 'today',
		names: ['TODAY', 'HEUTE'],
		description: 'Returns the current date.',
		inputs: [],
		output: { type: 'string', description: 'The current date as a string' },
		function: () => new Date().toISOString().split('T')[0]
	},
	{
		id: 'year',
		names: ['YEAR', 'JAHR'],
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
		names: ['WEEKDAY', 'WOCHENTAG'],
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
		names: ['MONTH', 'MONAT'],
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
		names: ['HOUR', 'STUNDE'],
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
		names: ['MINUTE'],
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
		names: ['SECOND', 'SEKUNDE'],
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
		names: ['DATE', 'DATUM'],
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
		names: ['TIME', 'ZEIT'],
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
		names: ['COUNT', 'ANZAHL'],
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
		functionIds: ['average', 'max', 'min', 'random']
	},
	{
		id: 'logical',
		functionIds: ['equals', 'less_than', 'greater_than', 'if', 'and', 'or', 'not']
	},
	{
		id: 'text',
		functionIds: [
			'concatenate',
			'length',
			'upper_case',
			'lower_case',
			'replace',
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
		functionIds: ['gabriel', 'count']
	}
];
