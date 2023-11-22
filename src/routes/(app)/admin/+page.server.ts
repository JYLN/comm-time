import { adminCreateCustomerSchema, adminEditCustomerSchema } from '$lib/schemas';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { serialize } from 'object-to-formdata';
import { ClientResponseError } from 'pocketbase';
import { superValidate } from 'sveltekit-superforms/server';
import type { CustomersResponse } from '../../../backend-types.js';

export async function load({ locals }) {
  const adminCreateCustomerForm = superValidate(adminCreateCustomerSchema);
  const adminEditCustomerForm = superValidate(adminEditCustomerSchema);

  const fullCustomersList = (await locals.pb
    ?.collection('customers')
    .getFullList()) as CustomersResponse[];

  return {
    adminCreateCustomerForm,
    adminEditCustomerForm,
    fullCustomersList
  };
}

export const actions: Actions = {
  createCustomer: async ({ request, locals }) => {
    const adminCreateCustomerForm = await superValidate(request, adminCreateCustomerSchema);

    if (!adminCreateCustomerForm.valid) {
      return fail(400, {
        adminCreateCustomerForm
      });
    }

    try {
      await locals.pb?.collection('customers').create(serialize(adminCreateCustomerForm.data));
    } catch (err) {
      if (err instanceof ClientResponseError) {
        console.error(err);
        const message = err.response.data.name.message || err.message;
        throw error(err.status, message);
      }
    }

    throw redirect(303, '/admin');
  },
  editCustomer: async ({ request, locals }) => {
    const adminEditCustomerForm = await superValidate(request, adminEditCustomerSchema);

    if (!adminEditCustomerForm.valid) {
      return fail(400, {
        adminEditCustomerForm
      });
    }

    try {
      await locals.pb
        ?.collection('customers')
        .update(adminEditCustomerForm.data.id, { name: adminEditCustomerForm.data.new_name });
    } catch (err) {
      if (err instanceof ClientResponseError) {
        console.error(err);
        const message = err.response.data.name.message || err.message;
        throw error(err.status, message);
      }
    }
  }
};
