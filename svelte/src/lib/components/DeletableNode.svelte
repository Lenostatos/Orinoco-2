<script lang="ts">
	import { useSvelteFlow, type NodeProps } from '@xyflow/svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		nodeId: NodeProps['id'];
		children: Snippet<[]>;
	}
	const { nodeId, children }: Props = $props();

	const { deleteElements } = useSvelteFlow();
</script>

<div class="relative">
	{@render children()}
	<button
		class="absolute top-0 right-0 w-5 h-5 pb-[2px] bg-slate-100 border border-white cursor-pointer rounded-[50%] text-xs text-slate-400 hover:bg-slate-300 hover:text-white"
		onclick={() => deleteElements({ nodes: [{ id: nodeId }] })}
	>
		x
	</button>
</div>
