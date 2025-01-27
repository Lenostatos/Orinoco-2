type InputType = string | number | boolean | undefined | null;

export function getParsingFunctionFor(outputType: 'any' | 'string' | 'number' | 'boolean') {
	let parsingFunction;

	switch (outputType) {
		case 'any':
		case 'string':
			parsingFunction = (input: InputType) => {
				if (typeof input === 'string') {
					return input;
				}
				if (typeof input === 'number') {
					return input.toString();
				}
				if (typeof input === 'boolean') {
					return input.toString();
				}
				return undefined;
			};
			break;

		case 'number':
			parsingFunction = (input: InputType) => {
				if (typeof input === 'string') {
					return Number.parseFloat(input);
				}
				if (typeof input === 'number') {
					return input;
				}
				if (typeof input === 'boolean') {
					return undefined;
				}
				return undefined;
			};
			break;

		case 'boolean':
			parsingFunction = (input: InputType) => {
				if (typeof input === 'string') {
					if (input === 'true') {
						return true;
					}
					if (input === 'false') {
						return false;
					}
					return undefined;
				}
				if (typeof input === 'number') {
					return undefined;
				}
				if (typeof input === 'boolean') {
					return input;
				}
				return undefined;
			};
			break;
	}

	return parsingFunction;
}
