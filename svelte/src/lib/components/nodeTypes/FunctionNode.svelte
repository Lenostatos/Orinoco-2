<script lang="ts">
	import { nodeFunctionCategories, nodeFunctionData } from '$lib/nodeFunctions';
	import { getParsingFunctionFor } from '$lib/nodeFunctionUtils';
	import {
		Handle,
		type NodeProps,
		useSvelteFlow,
		useHandleConnections,
		useNodesData,
		Position
	} from '@xyflow/svelte';
	import { fromStore } from 'svelte/store';
	import { fly } from 'svelte/transition';

	let { id: thisId, data, ...restProps }: NodeProps = $props();

	const { updateNodeData } = useSvelteFlow();

	const sourceConnections = $derived(
		fromStore(
			// This function call is hard to read for me
			// It means: get the connections to all nodes which are a source for this node here
			useHandleConnections({
				nodeId: thisId,
				type: 'target'
			})
		).current
	);

	const sourceNodeTexts = $derived.by(() => {
		if (sourceConnections.length === 0) {
			return undefined;
		}

		const sourceNodeIds = sourceConnections.map((c) => c.source);

		const sourceNodeData = useNodesData(sourceNodeIds);

		const sourceNodeDataTexts = fromStore(sourceNodeData).current?.map((d) => d?.data?.text);

		for (const sourceNodeDataText of sourceNodeDataTexts) {
			if (typeof sourceNodeDataText !== 'string' && typeof sourceNodeDataText !== 'undefined') {
				console.error('Unexpected node data.text type:', typeof sourceNodeDataText);
				throw new Error('Function source node data.text should either be a string or undefined.');
			}
		}

		return sourceNodeDataTexts as Array<string | undefined>;
	});

	let selectedFunctionId: string | undefined = $state(undefined);

	const selectedFunctionData = $derived(nodeFunctionData.find((f) => f.id === selectedFunctionId));

	$effect(() => {
		if (!sourceNodeTexts) {
			updateNodeData(thisId, { text: undefined });
			return;
		}

		if (sourceNodeTexts.find((t) => t === undefined)) {
			updateNodeData(thisId, { text: undefined });
			return;
		}

		if (!selectedFunctionData) {
			updateNodeData(thisId, { text: undefined });
			return;
		}

		const functionInputs: Array<string | number | boolean | undefined> = [];

		for (const [index, inputInfo] of selectedFunctionData.inputs.entries()) {
			const parsingFunction = getParsingFunctionFor(inputInfo.type);

			if (inputInfo.arrayInput) {
				for (const text of sourceNodeTexts.slice(index) as string[]) {
					const parsedInput = parsingFunction(text);
					functionInputs.push(parsedInput);
				}

				break;
			}

			const parsedInput = parsingFunction(sourceNodeTexts[index] as string);
			functionInputs.push(parsedInput);
		}

		if (functionInputs.includes(undefined)) {
			updateNodeData(thisId, { text: undefined });
		} else {
			updateNodeData(thisId, {
				text: selectedFunctionData.function(...(functionInputs as Array<string | number | boolean>))
			});
		}
	});

	let open = $state(false);

	function stopPropagation<E extends Event, F extends (event: E) => void>(fn: F) {
		return function (event: E) {
			event.stopPropagation();
			fn(event);
		};
	}

	const numInputs = $derived.by(() => {
		if (!selectedFunctionData) {
			return 0;
		}

		if (selectedFunctionData.inputs.length === 1 && selectedFunctionData.inputs[0].arrayInput) {
			return Infinity;
		}

		return selectedFunctionData.inputs.length;
	});
</script>

<svelte:document onclick={() => (open = false)} />

<div class="">
	<Handle
		type="target"
		position={Position.Top}
		isConnectable={sourceConnections.length < numInputs}
	/>
	<div class="rounded-full bg-sky-400 min-w-52 flex flex-col items-center">
		<div class="p-2 self-stretch">
			<button
				onclick={stopPropagation(() => (open = !open))}
				class="rounded-full p-2 hover:bg-sky-300 w-full"
			>
				{#if selectedFunctionId}
					<p class="font-bold">{selectedFunctionId}</p>
				{:else}
					<p class="italic">select a function</p>
				{/if}
			</button>
		</div>

		<div class="relative w-48">
			{#if open}
				<div
					class="absolute inset-x-0 top-2 z-50 divide-y-2 divide-sky-300 rounded-2xl bg-sky-400 overflow-scroll max-h-52"
					transition:fly={{ y: -10, duration: 150 }}
					onscroll={stopPropagation(() => {})}
					onwheel={stopPropagation(() => {})}
				>
					{#each nodeFunctionCategories as functionCategory}
						<details>
							<summary onclick={stopPropagation(() => {})}>{functionCategory.id}</summary>
							<ul>
								{#each functionCategory.functionIds as functionId}
									<li class={['flex flex-col items-stretch']}>
										<button
											class={[
												'p-2 py-2 hover:bg-sky-300',
												functionId === selectedFunctionId && 'rounded-sm bg-sky-300'
											]}
											onclick={stopPropagation(() => {
												selectedFunctionId = functionId;
												open = false;
											})}
										>
											<p class="">{functionId}</p>
										</button>
									</li>
								{/each}
							</ul>
						</details>
					{/each}
				</div>
			{/if}
		</div>
	</div>
	<div>{data.text}</div>
	<Handle type="source" position={Position.Bottom} />
</div>
