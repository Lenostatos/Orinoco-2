<script lang="ts">
	import { SvelteFlowProvider } from '@xyflow/svelte';

	import Flow from '$lib/components/Flow.svelte';
	import DnDProvider from '$lib/components/DnDProvider.svelte';
</script>

<SvelteFlowProvider>
	<DnDProvider>
		<Flow />
	</DnDProvider>
</SvelteFlowProvider>
