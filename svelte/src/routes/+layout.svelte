<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '../app.css';
	let { children } = $props();
	export const prerender = true;
</script>

<ParaglideJS {i18n}>
	{@render children()}
</ParaglideJS>
