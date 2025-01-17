<script lang="ts">
	import {
		getBezierPath,
		BaseEdge,
		type EdgeProps,
		EdgeLabelRenderer,
		useEdges
	} from '@xyflow/svelte';

	let {
		id,
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition,
		markerEnd = undefined
	}: EdgeProps = $props();

	const [edgePath, labelX, labelY] = $derived(
		getBezierPath({
			sourceX,
			sourceY,
			sourcePosition,
			targetX,
			targetY,
			targetPosition
		})
	);

	const edges = useEdges();

	const onEdgeClick = () => edges.update((eds) => eds.filter((edge) => edge.id !== id));
</script>

<BaseEdge path={edgePath} {markerEnd} style="stroke: rgb(203 213 225)" />
<EdgeLabelRenderer>
	<div
		class="absolute text-xs pointer-events-auto nodrag nopan"
		style:transform="translate(-50%, -50%) translate({labelX}px,{labelY}px)"
	>
		<button
			class="w-5 h-5 pb-[2px] bg-slate-100 border border-white cursor-pointer rounded-[50%] text-xs text-slate-400 hover:bg-slate-300 hover:text-white"
			onclick={onEdgeClick}
		>
			×
		</button>
	</div>
</EdgeLabelRenderer>

<style>
</style>
