<script lang="ts">
	import { page } from '$app/stores';
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	interface Space {
		id: string;
		name: string;
		description?: string;
	}

	interface Page {
		id: string;
		title: string;
		space: string;
	}

	let space: Space | null = null;
	let pages: Page[] = [];

	onMount(async () => {
		const spaceId = $page.params.spaceId;
		try {
			space = await pb.collection('spaces').getOne<Space>(spaceId);
			const resultList = await pb.collection('pages').getList<Page>(1, 50, {
				filter: `space = "${spaceId}"`
			});
			pages = resultList.items;
		} catch (err) {
			console.error('Error fetching space or pages:', err);
		}
	});
</script>

{#if space}
	<h1>{space.name}</h1>
	{#if space.description}
		<p>{space.description}</p>
	{/if}

	<h2>Pages</h2>
	{#if pages.length > 0}
		<ul>
			{#each pages as page}
				<li>
					<a href="/spaces/{space.id}/pages/{page.id}">{page.title}</a>
				</li>
			{/each}
		</ul>
	{:else}
		<p>No pages in this space yet.</p>
	{/if}
	<a href="/spaces/{space.id}/pages/new">Create a new page</a>
{:else}
	<p>Loading...</p>
{/if}
