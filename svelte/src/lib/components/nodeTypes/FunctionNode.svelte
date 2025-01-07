<script lang="ts">
	import {
		Handle,
		type NodeProps,
		useSvelteFlow,
		useHandleConnections,
		useNodesData,
		Position
	} from '@xyflow/svelte';
	import { fromStore } from 'svelte/store';

	let { id: thisId, data, ...restProps }: NodeProps = $props();

	const { updateNodeData } = useSvelteFlow();

	const sourceConnections = $derived(
		fromStore(
			// This function call is hard to read for me
			// It means: get the connections to all nodes which are a source for this node here
			useHandleConnections({
				nodeId: thisId,
				type: 'target'
			})
		).current
	);

	const sourceNodeText = $derived.by(() => {
		if (!sourceConnections[0]) {
			return undefined;
		}

		const sourceNodeId = sourceConnections[0].source;

		const sourceNodeData = useNodesData(sourceNodeId);

		const sourceNodeDataText = fromStore(sourceNodeData).current?.data?.text;

		if (typeof sourceNodeDataText !== 'string' && typeof sourceNodeDataText !== 'undefined') {
			throw new Error('Function source node data.text should either be a string or undefined.');
		}

		return sourceNodeDataText;
	});

	$effect(() => {
		updateNodeData(thisId, { text: sourceNodeText?.toUpperCase() || '' });
	});
</script>

<div class="custom">
	<Handle type="target" position={Position.Top} isConnectable={sourceConnections.length === 0} />
	<div>uppercase transform</div>
	<div>{data.text}</div>
	<Handle type="source" position={Position.Bottom} />
</div>
