<!-- src/lib/components/Input.svelte -->
<script lang="ts">
	export let label: string;
	export let value: string;
	export let type: 'text' | 'password' | 'email' = 'text';
	export let placeholder: string = '';
</script>

<label>
	{label}
	{#if type === 'text'}
		<input type="text" bind:value {placeholder} />
	{:else if type === 'password'}
		<input type="password" bind:value {placeholder} />
	{:else if type === 'email'}
		<input type="email" bind:value {placeholder} />
	{/if}
</label>

<style>
	/* Your styles here */
</style>
