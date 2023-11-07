export async function load({ locals, url }) {
  if (locals.user) {
    return {
      user: locals.user,
      url: url.pathname
    };
  }
}
