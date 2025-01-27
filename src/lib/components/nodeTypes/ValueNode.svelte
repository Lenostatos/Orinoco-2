<script module lang="ts">
	export type ValueNodeData = { text: string | undefined };
</script>

<script lang="ts">
	import {
		Position,
		type NodeProps,
		useSvelteFlow,
		useNodeConnections,
		useNodesData
	} from '@xyflow/svelte';
	import { fromStore } from 'svelte/store';
	import CustomHandle from '../CustomHandle.svelte';
	import DeletableNode from '../DeletableNode.svelte';

	interface ValueNodeProps extends NodeProps {
		data: ValueNodeData;
	}

	let { id: thisId, data }: ValueNodeProps = $props();

	const { updateNodeData } = useSvelteFlow();

	const sourceConnections = $derived(
		fromStore(
			// This function call is hard to read for me
			// It means: get the connections to all nodes which are a source for this node here
			useNodeConnections({
				id: thisId,
				handleType: 'target'
			})
		).current
	);

	const sourceNodeText = $derived.by(() => {
		if (sourceConnections.length === 0) {
			return undefined;
		}

		const sourceNodeIds = sourceConnections.map((c) => c.source);

		const sourceNodeData = useNodesData(sourceNodeIds);

		const sourceNodeDataTexts = fromStore(sourceNodeData).current?.map((d) => d?.data?.text);

		for (const sourceNodeDataText of sourceNodeDataTexts) {
			if (typeof sourceNodeDataText !== 'string' && typeof sourceNodeDataText !== 'undefined') {
				console.error('Unexpected node data.text type:', typeof sourceNodeDataText);
				throw new Error('Function node data.text should either be a string or undefined.');
			}
		}

		return sourceNodeDataTexts[0] as string | undefined;
	});

	const isOutput = $derived(sourceConnections.length === 1);

	const value = $derived.by(() => {
		if (isOutput) {
			return sourceNodeText;
		} else {
			return data.text;
		}
	});
</script>

<DeletableNode nodeId={thisId}>
	<CustomHandle
		type="target"
		position={Position.Top}
		isConnectable={sourceConnections.length <= 1}
	/>
	<input
		class="w-40"
		value={value ? value : ''}
		oninput={(event) => updateNodeData(thisId, { text: event.currentTarget.value })}
		readonly={isOutput}
	/>
	<CustomHandle type="source" position={Position.Bottom} />
</DeletableNode>
