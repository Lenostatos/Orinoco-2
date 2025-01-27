import { describe, expect, it } from 'vitest';
import { nodeFunctionData, type NodeFunctionInputData } from './nodeFunctions';

describe('function data', () => {
	it("doesn't contain functions with a combination of array and non-array inputs", () => {
		function areValidFunctionInputs(inputs: Array<NodeFunctionInputData>): boolean {
			if (inputs.find((i) => i.arrayInput) && inputs.length > 1) {
				return false;
			}
			return true;
		}
		for (const f of nodeFunctionData) {
			expect(areValidFunctionInputs(f.inputs)).to.equal(true);
		}
	});
});
