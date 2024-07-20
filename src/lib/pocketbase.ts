import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

export const pb = new PocketBase('http://127.0.0.1:8090');

// Define the User type
export interface User {
	id: string;
	email: string;
	name?: string;
	avatar?: string;
}

export const currentUser = writable<User | null>(pb.authStore.model);

export async function login(email: string, password: string) {
	const authData = await pb.collection('users').authWithPassword(email, password);
	currentUser.set(authData.record);
	return authData.record;
}

pb.authStore.onChange(() => {
	console.log('AuthStore changed', pb.authStore.model);
	if (pb.authStore.isValid) {
		const user: User = {
			id: pb.authStore.model?.id,
			email: pb.authStore.model?.email,
			name: pb.authStore.model?.name,
			avatar: pb.authStore.model?.avatar
		};
		currentUser.set(user);
	} else {
		currentUser.set(null);
	}
});

// ... other auth-related functions
