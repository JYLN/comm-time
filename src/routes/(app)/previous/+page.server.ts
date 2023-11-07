import { deleteTimeEntrySchema } from '$lib/schemas';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import { superValidate } from 'sveltekit-superforms/server';

export async function load({ locals }) {
  const timeEntries = await locals.pb
    ?.collection('time_entries')
    .getFullList({ filter: `author = "${locals.user.id}"`, expand: 'customer,shared_users' });

  return {
    tableData: timeEntries,
    deleteTimeForm: superValidate(deleteTimeEntrySchema)
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
  }
};
