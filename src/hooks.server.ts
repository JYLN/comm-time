import { redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

export async function handle({ event, resolve }) {
  event.locals.pb = new PocketBase('http://localhost:8090');
  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

  try {
    if (event.locals.pb.authStore.isValid) {
      await event.locals.pb.collection('users').authRefresh();
      event.locals.user = structuredClone(event.locals.pb.authStore.model);
    }
  } catch (_) {
    event.locals.pb.authStore.clear();
    event.locals.user = null;
  }

  if (!event.locals.user && event.url.pathname !== '/login') {
    throw redirect(303, '/login');
  }

  const response = await resolve(event);
  response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));

  return response;
}
