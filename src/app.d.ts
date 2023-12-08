import type {
  adminAddCustomerSchema,
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
      type AdminAddCustomerSchema = typeof adminAddCustomerSchema;
      type AdminEditCustomerSchema = typeof adminEditCustomerSchema;
    }

    interface EditorButtons {
      name: string;
      icon: ConstructorOfATypedSvelteComponent;
      command?:
        | 'heading'
        | 'bold'
        | 'italic'
        | 'link'
        | 'list-number'
        | 'list'
        | 'list-check'
        | 'image';
    }

    interface SelectData {
      label: string;
      value: string;
    }

    type AvatarProps = Expand<{ user: UsersResponse }> & HTMLAttributes<HTMLDivElement>;

    interface ToastData {
      title: string;
      description: string;
    }
  }
}

export {};
