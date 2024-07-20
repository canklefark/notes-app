<script lang="ts">
	export let type: string = 'text';
	export let label: string;
	export let value: string = '';
	export let placeholder: string = '';
	export let required: boolean = false;
</script>

<label class="label">
	<span>{label}</span>
	<input class="input" {type} bind:value {placeholder} {required} />
</label>

<style lang="postcss">
	.input {
		@apply bg-surface-500/10 border border-surface-500/20 rounded-md p-2 w-full;
	}
	.label {
		@apply flex flex-col space-y-1;
	}
</style>
