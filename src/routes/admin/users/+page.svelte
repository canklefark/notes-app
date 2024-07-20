<script lang="ts">
	import { pb, currentUser } from '$lib/pocketbase';
	import { onMount } from 'svelte';

	let users = [];

	onMount(async () => {
		if ($currentUser && $currentUser.role === 'admin') {
			const resultList = await pb.collection('users').getList(1, 50);
			users = resultList.items;
		}
	});

	async function updateUserRole(user, newRole) {
		await pb.collection('users').update(user.id, { role: newRole });
		users = users.map((u) => (u.id === user.id ? { ...u, role: newRole } : u));
	}
</script>

{#if $currentUser && $currentUser.role === 'admin'}
	<h1>User Management</h1>
	<table>
		<thead>
			<tr>
				<th>Username</th>
				<th>Email</th>
				<th>Role</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each users as user}
				<tr>
					<td>{user.username}</td>
					<td>{user.email}</td>
					<td>{user.role}</td>
					<td>
						<select on:change={(e) => updateUserRole(user, e.target.value)}>
							<option value="user" selected={user.role === 'user'}>User</option>
							<option value="admin" selected={user.role === 'admin'}>Admin</option>
						</select>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{:else}
	<p>You don't have permission to view this page.</p>
{/if}
