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
	<h1 class="h1">Welcome to Notes App</h1>

	{#if $currentUser}
		<h2 class="h2">Your Spaces</h2>
		{#if spaces.length > 0}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each spaces as space}
					<Card variant="filled-surface" hover={true} header={space.name}>
						{#if space.description}
							<section class="p-4">{space.description}</section>
						{/if}
						<footer slot="footer">
							<a href="/spaces/{space.id}" class="btn btn-sm variant-filled">Open</a>
						</footer>
					</Card>
				{/each}
			</div>
		{:else}
			<p>You don't have any spaces yet.</p>
		{/if}
		<a href="/spaces/new" class="btn variant-filled-primary">Create a new space</a>
	{:else}
		<p>Please <a href="/auth" class="anchor">login or register</a> to start using the app.</p>
	{/if}
</div>
