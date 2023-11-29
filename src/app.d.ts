import type {
  adminCreateCustomerSchema,
  adminEditCustomerSchema,
  deleteTimeEntrySchema,
  editTimeEntrySchema,
  loginFormSchema,
  sharedUsersSchema,
  timeEntrySchema
} from '$lib/schemas';
import type { Admin, Record } from 'pocketbase';
import PocketBase from 'pocketbase';
import type { CustomersResponse, UsersResponse } from './backend-types';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      pb?: PocketBase;
      user?: Admin | Record | null;
    }
    interface PageData {
      fullUsersList?: UsersResponse[];
      fullCustomersList?: CustomersResponse[];
    }
    // interface Platform {}
  }

  namespace Custom {
    namespace Forms {
      type LoginFormSchema = typeof loginFormSchema;
      type TimeEntrySchema = typeof timeEntrySchema;
      type EditTimeEntrySchema = typeof editTimeEntrySchema;
      type DeleteTimeEntrySchema = typeof deleteTimeEntrySchema;
      type SharedUsersSchema = typeof sharedUsersSchema;
      type AdminCreateCustomerSchema = typeof adminCreateCustomerSchema;
      type AdminEditCustomerSchema = typeof adminEditCustomerSchema;
    }

    interface EditorButtons {
      name: string;
      icon: ConstructorOfATypedSvelteComponent;
      command?: 'heading' | 'bold' | 'italic' | 'link' | 'list-number' | 'list';
    }

    interface SelectData {
      label: string;
      value: string;
    }
  }
}

export {};
