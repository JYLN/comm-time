import { redirect } from '@sveltejs/kit';

export async function GET({ locals }) {
  locals.pb?.authStore.clear();
  locals.user = null;

  throw redirect(303, '/login');
}
