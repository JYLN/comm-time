import { PUBLIC_LOCAL_POCKETBASE } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

export async function handle({ event, resolve }) {
  event.locals.pb = new PocketBase(PUBLIC_LOCAL_POCKETBASE);
  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

  try {
    if (event.locals.pb.authStore.isValid) {
      if (!event.locals.pb.authStore.isAdmin) {
        await event.locals.pb.collection('users').authRefresh();
        event.locals.user = structuredClone(event.locals.pb.authStore.model);
      } else {
        await event.locals.pb.admins.authRefresh();
        event.locals.user = structuredClone(event.locals.pb.authStore.model);
      }
    }
  } catch (_) {
    event.locals.pb.authStore.clear();
    event.locals.user = null;
  }

  if (!event.locals.user) {
    if (event.url.pathname !== '/login') {
      throw redirect(303, '/login');
    }
  } else {
    if (event.url.pathname !== '/logout') {
      if (event.locals.pb.authStore.isAdmin && event.url.pathname !== '/admin') {
        throw redirect(303, '/admin');
      }
    }
  }

  const response = await resolve(event);
  response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));

  return response;
}
