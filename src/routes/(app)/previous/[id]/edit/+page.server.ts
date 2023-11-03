import { customers, timeEntries } from '$lib/mock-data';
import { editTimeEntrySchema } from '$lib/schemas/index.js';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

export async function load({ params }) {
  try {
    const timeEntry = timeEntries.find((entry) => entry.id === params.id);
    const foundCustomer = customers.find((customer) => customer.label === timeEntry?.customer);
    const returnObj = {
      name: timeEntry?.name,
      customer: foundCustomer?.value,
      notes: timeEntry?.notes
    };
    const form = superValidate(returnObj, editTimeEntrySchema);

    return { timeEntry, form };
  } catch (err) {
    console.log(err);
    throw error(404, `${err}`);
  }
}

export const actions: Actions = {
  editTime: async ({ request }) => {
    const editTimeForm = await superValidate(request, editTimeEntrySchema);

    console.log('Submitted: ', editTimeForm);

    if (!editTimeForm.valid) {
      return fail(400, {
        form: editTimeForm
      });
    }

    throw redirect(303, '/previous');
  }
};
