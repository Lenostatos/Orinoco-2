<script lang="ts">
	import { SvelteFlowProvider } from '@xyflow/svelte';
	import Flow from '$lib/components/Flow.svelte';
	import DnDTypeContext from '$lib/components/DnDTypeContext.svelte';
</script>

<SvelteFlowProvider>
	<DnDTypeContext>
		<Flow />
	</DnDTypeContext>
</SvelteFlowProvider>
