<script lang="ts">
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount, onDestroy } from 'svelte';
	import { Breadcrumb } from '@skeletonlabs/skeleton';
	import RichTextEditor from '$lib/components/RichTextEditor.svelte';

	export let data;

	let space = data.space;
	let pages = data.pages;
	let currentPage = null;
	let breadcrumbs = [
		{ name: 'Spaces', href: '/spaces' },
		{ name: space.name, href: `/spaces/${space.id}` }
	];

	let unsubscribe;

	onMount(() => {
		unsubscribe = pb.collection('pages').subscribe('*', function (e) {
			if (e.record.space === space.id) {
				if (e.action === 'create') {
					pages = [...pages, e.record];
				} else if (e.action === 'update') {
					pages = pages.map((p) => (p.id === e.record.id ? e.record : p));
					if (currentPage && currentPage.id === e.record.id) {
						currentPage = e.record;
					}
				} else if (e.action === 'delete') {
					pages = pages.filter((p) => p.id !== e.record.id);
					if (currentPage && currentPage.id === e.record.id) {
						currentPage = null;
					}
				}
			}
		});
	});

	onDestroy(() => {
		if (unsubscribe) unsubscribe();
	});

	async function createPage() {
		const newPage = await pb.collection('pages').create({
			name: 'New Page',
			content: '',
			space: space.id,
			created_by: $currentUser.id
		});
		pages = [...pages, newPage];
	}

	function selectPage(page) {
		currentPage = page;
		breadcrumbs = [
			...breadcrumbs.slice(0, 2),
			{ name: page.name, href: `/spaces/${space.id}/pages/${page.id}` }
		];
	}

	async function savePage() {
		if (currentPage) {
			await pb.collection('pages').update(currentPage.id, {
				content: currentPage.content
			});
		}
	}
</script>

<Breadcrumb {breadcrumbs} />

<div class="grid grid-cols-4 gap-4">
	<div class="col-span-1">
		<button on:click={createPage} class="btn variant-filled-primary mb-4">Create Page</button>
		<ul>
			{#each pages as page}
				<li>
					<button on:click={() => selectPage(page)} class="btn variant-ghost">{page.name}</button>
				</li>
			{/each}
		</ul>
	</div>
	<div class="col-span-3">
		{#if currentPage}
			<h2>{currentPage.name}</h2>
			<RichTextEditor bind:content={currentPage.content} />
			<button on:click={savePage} class="btn variant-filled-primary mt-4">Save</button>
		{:else}
			<p>Select a page to edit</p>
		{/if}
	</div>
</div>
