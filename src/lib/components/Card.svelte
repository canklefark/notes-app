<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	export let variant: string = 'filled-surface';
	export let hover: boolean = false;
	export let padding: string = 'p-4';
	export let header: string | undefined = undefined;

	interface $$Slots {
		default: {};
		footer: {};
	}
</script>

<div class="card {variant} {hover ? 'card-hover' : ''} {padding}">
	{#if header}
		<header class="card-header">{header}</header>
	{/if}

	<div class="content">
		<slot />
	</div>

	<slot name="footer" />
</div>

<style lang="postcss">
	/* You can add any additional custom styles here if needed */
</style>
