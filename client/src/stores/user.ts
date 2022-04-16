import { writable } from 'svelte/store';

export interface UserData {}

const DEFAULT_DATA: UserData = {};

export const user = writable<UserData>(null);
