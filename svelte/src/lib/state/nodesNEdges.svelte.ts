import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Edge, Node } from '@xyflow/svelte';

export const nodesStore: Writable<Array<Node>> = writable([
	// {
	// 	id: '1',
	// 	type: 'valueNode',
	// 	data: { label: 'Value Node' },
	// 	position: { x: 100, y: 0 }
	// },
	// {
	// 	id: '3',
	// 	type: 'valueNode',
	// 	data: { label: 'Value Node' },
	// 	position: { x: 100, y: 150 }
	// },
	// {
	// 	id: '2',
	// 	type: 'functionNode',
	// 	data: { label: 'Function Node' },
	// 	position: { x: 300, y: 100 }
	// }
]);

export const edgesStore: Writable<Array<Edge>> = writable([
	// {
	// 	id: '1-2',
	// 	type: 'default',
	// 	source: '1',
	// 	target: '2'
	// }
	// {
	// 	id: '1-3',
	// 	type: 'smoothstep',
	// 	source: '1',
	// 	target: '3'
	// }
]);
