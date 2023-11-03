import { deleteTimeEntrySchema } from '$lib/schemas';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import { superValidate } from 'sveltekit-superforms/server';

export async function load({ locals }) {
  let timeEntries = await locals.pb?.collection('time_entries').getFullList();
  const customers = await locals.pb?.collection('customers').getFullList();

  timeEntries = timeEntries?.map((entry) => ({
    ...entry,
    customer: customers?.find((customer) => customer.id === entry.customer)?.name
  }));

  console.log(timeEntries);

  return {
    tableData: timeEntries,
    form: superValidate(deleteTimeEntrySchema)
  };
}

export const actions: Actions = {
  deleteTimeEntry: async ({ request, locals }) => {
    const deleteTimeForm = await superValidate(request, deleteTimeEntrySchema);

    if (!deleteTimeForm.valid) {
      return fail(400, {
        form: deleteTimeForm
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
