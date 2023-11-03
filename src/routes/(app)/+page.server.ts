import { timeEntrySchema } from '$lib/schemas';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { serialize } from 'object-to-formdata';
import { ClientResponseError } from 'pocketbase';
import { superValidate } from 'sveltekit-superforms/server';

export async function load({ locals }) {
  const customers = await locals.pb?.collection('customers').getFullList();

  return {
    form: superValidate(timeEntrySchema),
    customerData: customers
  };
}

export const actions: Actions = {
  createTime: async ({ request, locals }) => {
    const formData = await request.formData();

    if (locals.user) {
      formData.set('author', locals.user.id);
    }

    const createTimeForm = await superValidate(formData, timeEntrySchema);

    console.log('Submitted: ', createTimeForm);

    if (!createTimeForm.valid) {
      return fail(400, {
        form: createTimeForm
      });
    }

    try {
      await locals.pb?.collection('time_entries').create(serialize(createTimeForm.data));
    } catch (err) {
      if (err instanceof ClientResponseError) {
        console.error(err);
        throw error(err.status, err.message);
      }
    }

    throw redirect(303, '/');
  }
};
