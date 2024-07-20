<!-- src/routes/profile/+page.svelte -->
<script lang="ts">
	import { currentUser } from '$lib/pocketbase';
</script>

<h1>User Profile</h1>
{#if $currentUser}
	<p>Email: {$currentUser.email}</p>
	<!-- Add more user details as needed -->
{:else}
	<p>Please log in to view your profile.</p>
{/if}
