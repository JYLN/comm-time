import { deleteTimeEntrySchema, sharedUsersSchema } from '$lib/schemas';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import { superValidate } from 'sveltekit-superforms/server';

export async function load({ locals }) {
  const timeEntries = await locals.pb?.collection('time_entries').getFullList({
    filter: `author = "${locals.user.id}"`,
    sort: '-start_time',
    expand: 'customer,shared_users,author'
  });

  const fullUsersList = await locals.pb?.collection('users').getFullList();

  return {
    tableData: timeEntries,
    deleteTimeForm: superValidate(deleteTimeEntrySchema),
    sharedUsersForm: superValidate(sharedUsersSchema),
    fullUsersList
  };
}

export const actions: Actions = {
  deleteTimeEntry: async ({ request, locals }) => {
    const deleteTimeForm = await superValidate(request, deleteTimeEntrySchema);

    if (!deleteTimeForm.valid) {
      return fail(400, {
        deleteTimeForm
      });
    }

    try {
      await locals.pb?.collection('time_entries').delete(deleteTimeForm.data.id);
    } catch (err) {
      if (err instanceof ClientResponseError) {
        console.error(err);
        throw error(err.status, err.message);
      }
    }

    throw redirect(303, '/previous');
  },

  shareTimeEntry: async ({ request, locals }) => {
    const sharedUserForm = await superValidate(request, sharedUsersSchema);

    if (!sharedUserForm.valid) {
      return fail(400, {
        form: sharedUserForm
      });
    }

    try {
      await locals.pb
        ?.collection('time_entries')
        .update(sharedUserForm.data.id, { shared_users: sharedUserForm.data.shared_users });
    } catch (err) {
      if (err instanceof ClientResponseError) {
        console.error(err);
        throw error(err.status, err.message);
      }
    }

    throw redirect(303, '/previous');
  }
};
