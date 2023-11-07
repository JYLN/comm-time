export async function load({ locals }) {
  const sharedTimeEntries = locals.pb?.collection('time_entries').getFullList({
    filter: `shared_users ?~ "${locals.user.id}"`,
    expand: 'customer,shared_users'
  });

  return {
    tableData: sharedTimeEntries
  };
}
