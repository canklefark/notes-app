<script lang="ts">
	import { page } from '$app/stores';
	import { pb, currentUser } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { ClientResponseError } from 'pocketbase';

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
			if (err instanceof ClientResponseError) {
				error = err.message;
			} else {
				error = 'An unknown error occurred while creating the space';
			}
			console.error('Error creating space:', err);
		}
	}
</script>

<h1>Create a New Space</h1>

{#if error}
	<p class="error">{error}</p>
{/if}

<form on:submit|preventDefault={createSpace}>
	<label>
		Name:
		<input type="text" bind:value={name} required />
	</label>
	<label>
		Description:
		<textarea bind:value={description}></textarea>
	</label>
	<button type="submit">Create Space</button>
</form>
