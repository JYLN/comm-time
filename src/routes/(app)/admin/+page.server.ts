import { adminCreateCustomerSchema, adminEditCustomerSchema } from '$lib/schemas';
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
