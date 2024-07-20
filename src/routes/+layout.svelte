<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, AppRail, AppRailTile } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { currentUser } from '$lib/pocketbase';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	let currentTile = 0;
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Notes App</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if $currentUser}
					<a href="/profile" class="btn btn-sm variant-ghost-surface">Profile</a>
				{:else}
					<a href="/auth" class="btn btn-sm variant-ghost-surface">Login</a>
				{/if}
				{#if $currentUser && $currentUser.role === 'admin'}
					<AdminPanel />
				{/if}
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<AppRail>
			<AppRailTile bind:group={currentTile} name="home" value={0} title="Home">
				<svelte:fragment slot="lead">
					<i class="fas fa-home text-2xl"></i>
				</svelte:fragment>
				<span>Home</span>
			</AppRailTile>
			<AppRailTile bind:group={currentTile} name="spaces" value={1} title="Spaces">
				<svelte:fragment slot="lead">
					<i class="fas fa-folder text-2xl"></i>
				</svelte:fragment>
				<span>Spaces</span>
			</AppRailTile>
			{#if $currentUser}
				<AppRailTile bind:group={currentTile} name="create" value={2} title="Create Space">
					<svelte:fragment slot="lead">
						<i class="fas fa-plus text-2xl"></i>
					</svelte:fragment>
					<span>Create</span>
				</AppRailTile>
			{/if}
		</AppRail>
	</svelte:fragment>

	<main class="container mx-auto p-4">
		<slot />
	</main>
</AppShell>
