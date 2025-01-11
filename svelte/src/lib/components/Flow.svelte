<script lang="ts">
	import {
		SvelteFlow,
		Controls,
		Background,
		BackgroundVariant,
		MiniMap,
		useSvelteFlow,
		type Node,
		type NodeTypes
	} from '@xyflow/svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';

	import '@xyflow/svelte/dist/style.css';
	import { getDnDTypeContext, type DnDType } from './DnDTypeContext.svelte';
	import ValueNode from './nodeTypes/ValueNode.svelte';
	import FunctionNode from './nodeTypes/FunctionNode.svelte';
	import { edgesStore, nodesStore } from '$lib/state/nodesNEdges.svelte';
	import EdgeWButton from './EdgeWButton.svelte';

	const nodeTypes: NodeTypes = {
		valueNode: ValueNode,
		functionNode: FunctionNode
	};

	const edgeTypes = {
		edgeWButton: EdgeWButton
	};

	const { screenToFlowPosition } = useSvelteFlow();

	const dnd: DnDType = getDnDTypeContext();

	const ondragover = (event: DragEvent) => {
		event.preventDefault();

		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = 'move';
		}
	};

	const ondrop = (event: DragEvent) => {
		event.preventDefault();

		if (!dnd.type) {
			return;
		}

		const position = screenToFlowPosition({
			x: event.clientX,
			y: event.clientY
		});

		const newNode = {
			id: `${Math.random()}`,
			type: dnd.type,
			position,
			data: { label: `${dnd.type} node` },
			origin: [0.5, 0.0]
		} satisfies Node;

		$nodesStore.push(newNode);
		nodesStore.set($nodesStore);
	};
</script>

<main class="h-screen flex flex-col-reverse">
	<SvelteFlow
		nodes={nodesStore}
		edges={edgesStore}
		{nodeTypes}
		{edgeTypes}
		fitView
		{ondragover}
		{ondrop}
		defaultEdgeOptions={{ type: 'edgeWButton' }}
	>
		<Controls />
		<Background variant={BackgroundVariant.Dots} />
		<MiniMap />
	</SvelteFlow>
	<Sidebar />
</main>
