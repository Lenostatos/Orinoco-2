<script lang="ts">
	import { getDnDTypeContext, type DnDType } from './DnDTypeContext.svelte';
	import * as m from '$lib/paraglide/messages';
	import { i18n } from '$lib/i18n.js';
	import { page } from '$app/state';

	const dnd: DnDType = getDnDTypeContext();

	const onDragStart = (event: DragEvent, nodeType: string) => {
		if (!event.dataTransfer) {
			return null;
		}

		dnd.type = nodeType;

		event.dataTransfer.effectAllowed = 'move';
	};
</script>

{#snippet button(nodeType: 'valueNode' | 'functionNode')}
	<div
		role="button"
		tabindex="0"
		class="{nodeType}-node m-2 border border-black py-2 px-4 font-bold rounded-sm cursor-grab"
		ondragstart={(event) => onDragStart(event, nodeType)}
		draggable={true}
	>
		{#if nodeType === 'valueNode'}
			{m.value_node()}
		{:else if nodeType === 'functionNode'}
			{m.function_node()}
		{:else}
			{nodeType}
		{/if}
	</div>
{/snippet}

<aside class="relative w-full bg-gray-100 text-xs flex flex-col justify-center items-center">
	<div class="my-4 text-sm">{m.draggable_nodes_hint()}</div>
	<div class="flex justify-center items-center">
		{@render button('valueNode')}
		{@render button('functionNode')}
	</div>
	<div class="absolute top-2 right-2">
		<a href={i18n.route(page.url.pathname)} hreflang="de">DE</a> |
		<a href={i18n.route(page.url.pathname)} hreflang="en">EN</a>
	</div>
</aside>
