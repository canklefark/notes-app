<script lang="ts">
	import { pb, currentUser } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	let name = '';
	let description = '';
	let error = '';

	async function createSpace() {
		if (!$currentUser) {
			error = 'You must be logged in to create a space';
			return;
		}

		try {
			const newSpace = await pb.collection('spaces').create({
				name,
				description,
				created_by: $currentUser.id
			});
			goto(`/spaces/${newSpace.id}`);
		} catch (err) {
			if (err instanceof Error) {
				error = err.message;
			} else {
				error = 'An unknown error occurred while creating the space';
			}
		}
	}
</script>

<div class="space-y-4">
	<h1 class="h1">Create a New Space</h1>

	{#if error}
		<p class="text-error-500">{error}</p>
	{/if}

	<form on:submit|preventDefault={createSpace} class="space-y-4">
		<label class="label">
			<span>Name:</span>
			<input class="input" type="text" bind:value={name} required />
		</label>
		<label class="label">
			<span>Description:</span>
			<textarea class="textarea" bind:value={description}></textarea>
		</label>
		<button type="submit" class="btn variant-filled-primary">Create Space</button>
	</form>
</div>
