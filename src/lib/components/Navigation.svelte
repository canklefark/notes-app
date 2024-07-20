<script lang="ts">
	import { slide } from 'svelte/transition';
	import { Icon } from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';
	import { pb, currentUser } from '$lib/pocketbase';

	interface Space {
		id: string;
		name: string;
		pages: Page[];
	}

	interface Page {
		id: string;
		name: string;
		children: Page[];
	}

	let spaces: Space[] = [];
	const expandedSpaces = writable<Set<string>>(new Set());

	async function fetchSpaces() {
		if ($currentUser) {
			const resultList = await pb.collection('spaces').getList<Space>(1, 50, {
				filter: `created_by = "${$currentUser.id}"`,
				expand: 'pages'
			});
			spaces = resultList.items;
		}
	}

	function toggleSpace(spaceId: string) {
		$expandedSpaces = $expandedSpaces.has(spaceId)
			? new Set([...$expandedSpaces].filter((id) => id !== spaceId))
			: new Set([...$expandedSpaces, spaceId]);
	}

	$: {
		if ($currentUser) {
			fetchSpaces();
		}
	}
</script>

<nav class="space-y-2">
	{#each spaces as space}
		<div>
			<button
				class="flex items-center w-full p-2 hover:bg-surface-500/10 rounded-md"
				on:click={() => toggleSpace(space.id)}
			>
				<Icon
					name={$expandedSpaces.has(space.id) ? 'chevron-down' : 'chevron-right'}
					class="mr-2"
				/>
				<Icon name="folder" class="mr-2" />
				{space.name}
			</button>
			{#if $expandedSpaces.has(space.id)}
				<div transition:slide class="ml-4">
					{#each space.pages as page}
						<a
							href="/spaces/{space.id}/pages/{page.id}"
							class="flex items-center p-2 hover:bg-surface-500/10 rounded-md"
						>
							<Icon name="file-text" class="mr-2" />
							{page.name}
						</a>
					{/each}
				</div>
			{/if}
		</div>
	{/each}
</nav>
