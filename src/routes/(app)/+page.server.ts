import { timeEntrySchema } from '$lib/schemas';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

export async function load({ locals }) {
  const customers = await locals.pb?.collection('customers').getFullList();

  return {
    form: superValidate(timeEntrySchema),
    customerData: customers
  };
}

export const actions: Actions = {
  createTime: async ({ request }) => {
    const createTimeForm = await superValidate(request, timeEntrySchema);

    console.log('Submitted: ', createTimeForm);

    if (!createTimeForm.valid) {
      return fail(400, {
        form: createTimeForm
      });
    }

    throw redirect(303, '/');
  }
};
