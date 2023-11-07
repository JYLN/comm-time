import { sharedUsersSchema } from '$lib/schemas/index.js';
import { error, fail, redirect } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import { superValidate } from 'sveltekit-superforms/server';

export async function load({ locals, params }) {
  try {
    const timeEntry = await locals.pb?.collection('time_entries').getOne(params.id);
    const fullUsersList = await locals.pb?.collection('users').getFullList();

    return {
      timeEntry,
      fullUsersList,
      form: superValidate(sharedUsersSchema)
    };
  } catch (err) {
    if (err instanceof ClientResponseError) {
      console.error(err);
      throw error(err.status, err.message);
    }
  }
}

export const actions = {
  shareTimeEntry: async ({ request, locals, params }) => {
    const sharedUserForm = await superValidate(request, sharedUsersSchema);

    if (!sharedUserForm.valid) {
      return fail(400, {
        form: sharedUserForm
      });
    }

    try {
      await locals.pb
        ?.collection('time_entries')
        .update(params.id, { shared_users: sharedUserForm.data.shared_users });
    } catch (err) {
      if (err instanceof ClientResponseError) {
        console.error(err);
        throw error(err.status, err.message);
      }
    }

    throw redirect(303, '/previous');
  }
};
