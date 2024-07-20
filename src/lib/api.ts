// src/lib/api.ts
import { pb } from '$lib/pocketbase';
import { userRole } from '$lib/stores/userStore';
import { get } from 'svelte/store';

export async function createSpace(name: string) {
	const role = get(userRole);
	if (role !== 'admin') {
		throw new Error('Unauthorized: Only admins can create spaces');
	}

	return await pb.collection('spaces').create({ name });
}

export async function editPage(id: string, data: Record<string, any>) {
	const role = get(userRole);
	if (!['admin', 'editor'].includes(role || '')) {
		throw new Error('Unauthorized: Only admins and editors can edit pages');
	}

	return await pb.collection('pages').update(id, data);
}

export async function deleteUser(id: string) {
	const role = get(userRole);
	if (role !== 'admin') {
		throw new Error('Unauthorized: Only admins can delete users');
	}

	return await pb.collection('users').delete(id);
}
