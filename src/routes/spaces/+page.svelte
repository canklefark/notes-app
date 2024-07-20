<script lang="ts">
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import Card from '$lib/components/Card.svelte'; // Update this import path if needed

	interface Space {
		id: string;
		name: string;
		description?: string;
	}

	let spaces: Space[] = [];

	onMount(async () => {
		if ($currentUser) {
			const resultList = await pb.collection('spaces').getList<Space>(1, 50, {
				filter: `created_by = "${$currentUser.id}"`
			});
			spaces = resultList.items;
		}
	});
</script>

<div class="space-y-4">
	<h1 class="h1">Your Spaces</h1>

	{#if spaces.length > 0}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each spaces as space}
				<Card>
					<header class="card-header">{space.name}</header>
					{#if space.description}
						<section class="p-4">{space.description}</section>
					{/if}
					<footer class="card-footer">
						<a href="/spaces/{space.id}" class="btn btn-sm variant-filled">Open</a>
					</footer>
				</Card>
			{/each}
		</div>
	{:else}
		<p>You don't have any spaces yet.</p>
	{/if}

	<a href="/spaces/new" class="btn variant-filled-primary">Create a new space</a>
</div>
