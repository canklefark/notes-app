<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import type { User } from '$lib/types';

	let users: User[] = [];

	async function fetchUsers() {
		users = await pb.collection('users').getFullList<User>();
	}

	async function updateUserRole(user: User, newRole: string) {
		await pb.collection('users').update(user.id, { role: newRole });
		users = users.map((u) => (u.id === user.id ? { ...u, role: newRole } : u));
	}

	function handleRoleChange(user: User, event: Event) {
		const target = event.target as HTMLSelectElement;
		updateUserRole(user, target.value);
	}

	fetchUsers();
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
