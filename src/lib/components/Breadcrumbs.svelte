<!-- src/lib/components/Breadcrumbs.svelte -->
<script lang="ts">
	export let crumbs: Array<{ name: string; href: string }>;
</script>

<nav
	class="flex py-3 px-5 text-gray-700 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
	aria-label="Breadcrumb"
>
	<ol class="inline-flex items-center space-x-1 md:space-x-3">
		{#each crumbs as crumb, index}
			<li class="inline-flex items-center">
				{#if index > 0}
					<svg
						class="w-6 h-6 text-gray-400"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
							clip-rule="evenodd"
						></path></svg
					>
				{/if}
				<a
					href={crumb.href}
					class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
				>
					{crumb.name}
				</a>
			</li>
		{/each}
	</ol>
</nav>
