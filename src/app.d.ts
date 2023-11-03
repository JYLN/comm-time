import type { Admin, Record } from 'pocketbase';
import PocketBase from 'pocketbase';

type PocketBaseUser = Admin | Record | null;

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      pb?: PocketBase;
      user?: PocketBaseUser;
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
