<script lang="ts">
	import type { HandleProps } from '@xyflow/svelte';
	import { Handle, Position } from '@xyflow/svelte';

	const { position, type, isConnectable = true }: HandleProps = $props();

	const fixedStyle =
		'position: relative; width: 0.75rem/* 12px */; height: 0.75rem/* 12px */;    --tw-bg-opacity: 1; background-color: rgb(203 213 225 / var(--tw-bg-opacity, 1));    display: flex; flex-direction: row;    --tw-translate-x: -6px; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));    border-width: 1px; --tw-border-opacity: 1; border-color: rgb(226 232 240 / var(--tw-border-opacity, 1));';

	const style = $derived(
		position === Position.Top
			? fixedStyle +
					'--tw-translate-y: 6px; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));'
			: fixedStyle +
					'--tw-translate-y: -6px; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));'
	);
</script>

<Handle {position} {type} {isConnectable} {style} />
