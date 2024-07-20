<script lang="ts">
	import { page } from '$app/stores';
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	interface Page {
		id: string;
		title: string;
		content: string;
		space: string;
	}
	let pageData: Page | null = null;

	onMount(async () => {
		const { pageId } = $page.params;
		try {
			pageData = await pb.collection('pages').getOne<Page>(pageId);
		} catch (err) {
			console.error('Error fetching page:', err);
		}
	});
</script>

{#if pageData}
	<h1>{pageData.title}</h1>
	<div>{@html pageData.content}</div>
{:else}
	<p>Loading...</p>
{/if}
