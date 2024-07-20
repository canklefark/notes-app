import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

export const pb = new PocketBase('http://127.0.0.1:8090');

// Define the User type
export interface User {
	id: string;
	email: string;
	role?: string;
	// Add other properties as needed
}

export const currentUser = writable<User | null>(pb.authStore.model as User | null);

export async function login(email: string, password: string) {
	const authData = await pb.collection('users').authWithPassword(email, password);
	currentUser.set(authData.record as User);
	return authData.record;
}

pb.authStore.onChange((auth) => {
	console.log('AuthStore changed', auth);
	currentUser.set(auth ? (auth.model as unknown as User) : null);
});

// Example of getting a user
export async function getUser() {
	if (pb.authStore.model) {
		const user = await pb.collection('users').getOne<User>(pb.authStore.model?.id);
		return user;
	}
	return null;
}
// ... other auth-related functions
