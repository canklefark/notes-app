// src/lib/stores/userStore.ts
import { writable } from 'svelte/store';

export const userRole = writable<string | null>(null);
