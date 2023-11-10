export async function load({ locals }) {
  const sharedTimeEntries = locals.pb?.collection('time_entries').getFullList({
    filter: `shared_users ?~ "${locals.user.id}"`,
    sort: '-start_time',
    expand: 'customer,shared_users'
  });

  return {
    tableData: sharedTimeEntries
  };
}
