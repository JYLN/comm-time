import type { Admin, Record } from 'pocketbase';
import PocketBase from 'pocketbase';
import type { UsersResponse } from './backend-types';

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
    interface PageData {
      fullUsersList?: UsersResponse[] | undefined;
    }
    // interface Platform {}
  }
}

export {};
