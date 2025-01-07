<script lang="ts">
	import { getDnDTypeContext, type DnDType } from './DnDTypeContext.svelte';
	import { useSvelteFlow } from '@xyflow/svelte';

	const { getNode, updateNode } = useSvelteFlow();

	const dnd: DnDType = getDnDTypeContext();

	const onDragStart = (event: DragEvent, nodeType: string) => {
		if (!event.dataTransfer) {
			return null;
		}

		dnd.type = nodeType;

		event.dataTransfer.effectAllowed = 'move';
	};
</script>

{#snippet button(nodeType: 'input' | 'default' | 'output')}
	<div
		role="button"
		tabindex="0"
		class="{nodeType}-node m-2 border border-black py-2 px-4 font-bold rounded-sm cursor-grab"
		ondragstart={(event) => onDragStart(event, nodeType)}
		draggable={true}
	>
		{nodeType} Node
	</div>
{/snippet}

<aside class="w-full bg-gray-100 text-xs flex flex-col justify-center items-center">
	<div class="my-4 text-sm">You can drag these nodes to the pane below.</div>
	<div class="flex justify-center items-center">
		{@render button('input')}
		{@render button('default')}
		{@render button('output')}
	</div>
	<button
		onclick={() => {
			const node = getNode('1');
			if (node) updateNode('1', { position: { ...node?.position, x: node?.position.x + 100 } });
		}}>shift first node</button
	>
</aside>
