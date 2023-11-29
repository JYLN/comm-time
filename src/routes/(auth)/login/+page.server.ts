import { loginFormSchema } from '$lib/schemas';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import { superValidate } from 'sveltekit-superforms/server';

export async function load({ locals }) {
  if (locals.user) throw redirect(303, '/');

  return {
    form: superValidate(loginFormSchema)
  };
}

export const actions: Actions = {
  login: async ({ request, locals }) => {
    const loginForm = await superValidate(request, loginFormSchema);

    if (!loginForm.valid) {
      return fail(400, {
        form: loginForm
      });
    }

    try {
      await locals.pb
        ?.collection('users')
        .authWithPassword(loginForm.data.email, loginForm.data.password);
    } catch (_) {
      try {
        await locals.pb?.admins.authWithPassword(loginForm.data.email, loginForm.data.password);
      } catch (err) {
        if (err instanceof ClientResponseError) {
          console.error(err);
          throw error(err.status, err.message);
        }
      }

      throw redirect(303, '/admin');
    }

    throw redirect(303, '/');
  }
};
