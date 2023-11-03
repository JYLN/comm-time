import { editTimeEntrySchema } from '$lib/schemas/index.js';
import { error, fail, redirect } from '@sveltejs/kit';
import { serialize } from 'object-to-formdata';
import { ClientResponseError } from 'pocketbase';
import { superValidate } from 'sveltekit-superforms/server';
import type { CustomersResponse } from '../../../../../backend-types.js';

export async function load({ locals, params }) {
  try {
    const timeEntry = await locals.pb?.collection('time_entries').getOne(params.id);

    if (timeEntry) {
      const customers = (await locals.pb
        ?.collection('customers')
        .getFullList()) as CustomersResponse[];

      const returnObj = {
        name: timeEntry.name,
        customer: timeEntry.customer,
        notes: timeEntry.notes || ''
      };

      const form = superValidate(returnObj, editTimeEntrySchema);

      return { timeEntry, form, customerData: customers };
    }
  } catch (err) {
    if (err instanceof ClientResponseError) {
      console.error(err);
      throw error(err.status, err.message);
    }
  }
}

export const actions = {
  editTime: async ({ request, locals, params }) => {
    const editTimeForm = await superValidate(request, editTimeEntrySchema);

    if (!editTimeForm.valid) {
      return fail(400, {
        form: editTimeForm
      });
    }

    try {
      await locals.pb?.collection('time_entries').update(params.id, serialize(editTimeForm.data));
    } catch (err) {
      if (err instanceof ClientResponseError) {
        console.error(err);
        throw error(err.status, err.message);
      }
    }

    throw redirect(303, '/previous');
  }
};
