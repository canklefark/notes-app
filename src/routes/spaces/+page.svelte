<script lang="ts">
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount, onDestroy } from 'svelte';
	import RichTextEditor from '$lib/components/RichTextEditor.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	export let data: { space: any; pages: any[] };
	let space = data.space;
	let pages = data.pages;
	let currentPage: any;
	let breadcrumbs = [
		{ name: 'Spaces', href: '/spaces' },
		{ name: space.name, href: `/spaces/${space.id}` }
	];
	let unsubscribe: (() => void) | null = null;

	onMount(async () => {
		unsubscribe = await subscribeToPages();
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});

	async function subscribeToPages() {
		return pb.collection('pages').subscribe('*', function (e) {
			if (e.record.space === space.id) {
				if (e.action === 'create') {
					pages = [...pages, e.record];
				} else if (e.action === 'update') {
					updateCurrentPage(e.record);
				} else if (e.action === 'delete') {
					deletePage(e.record);
				}
			}
		});
	}

	function setCurrentPage(p: any) {
		currentPage = p;
	}

	function updateCurrentPage(p: any) {
		pages = pages.map((page) => (page.id === p.id ? p : page));
		if (currentPage && currentPage.id === p.id) {
			currentPage = p;
		}
	}

	async function deletePage(page: { id: string }) {
		pages = pages.filter((p) => p.id !== page.id);
		if (currentPage && currentPage.id === page.id) {
			currentPage = null;
		}
	}

	async function createPage() {
		const newPage = await pb.collection('pages').create({
			name: 'New Page',
			content: '',
			space: space.id,
			created_by: $currentUser?.id
		});
		pages = [...pages, newPage];
	}

	function selectPage(page) {
		setCurrentPage(page);
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

<Breadcrumbs crumbs={breadcrumbs} />

<div class="grid grid-cols-4 gap-4 mt-4">
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
			{#if $currentUser}
				<p>Created by {$currentUser.email}</p>
			{/if}
		{:else}
			<p>Select a page to edit</p>
		{/if}
	</div>
</div>
