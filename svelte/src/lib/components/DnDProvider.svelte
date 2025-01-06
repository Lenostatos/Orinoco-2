<script lang="ts">
	import { onDestroy, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	let { children } = $props();

	const dndType = writable(null);

	setContext('dnd', dndType);

	onDestroy(() => {
		dndType.set(null);
	});
</script>

{@render children()}
