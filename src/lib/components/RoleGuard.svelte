<!-- src/lib/components/RoleGuard.svelte -->
<script lang="ts">
	import { userRole } from '$lib/stores/userStore';

	export let roles: string[] = [];
</script>

{#if $userRole && roles.includes($userRole)}
	<slot />
{/if}
