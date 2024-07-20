<script lang="ts">
	export let label: string;
	export let value: string = '';
	export let placeholder: string = '';
	export let required: boolean = false;
	export let rows: number = 3;
</script>

<label class="label">
	<span>{label}</span>
	<textarea class="textarea" bind:value {placeholder} {required} {rows}></textarea>
</label>

<style lang="postcss">
	.textarea {
		@apply bg-surface-500/10 border border-surface-500/20 rounded-md p-2 w-full resize-y;
	}
	.label {
		@apply flex flex-col space-y-1;
	}
</style>
