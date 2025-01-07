<script module>
	export type ValueNodeData = { text: string | undefined };
</script>

<script lang="ts">
	import { Handle, Position, type NodeProps, useSvelteFlow } from '@xyflow/svelte';

	interface ValueNodeProps extends NodeProps {
		data: ValueNodeData;
	}

	let { id, data, ...restProps }: ValueNodeProps = $props();

	const { updateNodeData } = useSvelteFlow();
</script>

<div>
	<Handle type="target" position={Position.Top} />
	<div>text</div>
	<div>
		<input
			value={data.text}
			oninput={(event) => updateNodeData(id, { text: event.currentTarget.value })}
		/>
	</div>
	<Handle type="source" position={Position.Bottom} />
</div>
