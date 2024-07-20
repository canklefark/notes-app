<script lang="ts">
	import { pb, currentUser } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { ClientResponseError } from 'pocketbase';

	let email = '';
	let password = '';
	let error = '';

	async function login() {
		try {
			await pb.collection('users').authWithPassword(email, password);
			goto('/');
		} catch (err) {
			if (err instanceof ClientResponseError) {
				error = err.message;
			} else {
				error = 'An unknown error occurred';
			}
		}
	}

	async function register() {
		try {
			await pb.collection('users').create({ email, password, passwordConfirm: password });
			await login();
		} catch (err) {
			if (err instanceof ClientResponseError) {
				error = err.message;
			} else {
				error = 'An unknown error occurred';
			}
		}
	}

	function logout() {
		pb.authStore.clear();
	}
</script>

<form on:submit|preventDefault={login}>
	<input type="email" bind:value={email} placeholder="Email" required />
	<input type="password" bind:value={password} placeholder="Password" required />
	<button type="submit">Login</button>
	<button type="button" on:click={register}>Register</button>
</form>

{#if error}
	<p class="error">{error}</p>
{/if}
