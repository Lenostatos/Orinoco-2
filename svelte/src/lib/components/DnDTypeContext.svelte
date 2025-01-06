<script module>
	const dndTypeKey = Symbol('dndType');

	export type DnDType = { type: string | null };

	function setDnDTypeContext(dnd: DnDType): void {
		setContext(dndTypeKey, dnd);
	}

	export function getDnDTypeContext(): DnDType {
		return getContext(dndTypeKey);
	}
</script>

<script lang="ts">
	import { getContext, setContext } from 'svelte';

	let { children } = $props();

	let dnd: DnDType = $state({ type: null });

	setDnDTypeContext(dnd);
</script>

{@render children()}
